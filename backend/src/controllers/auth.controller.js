const User = require('../models/User');
const bcrypt = require('bcryptjs');//pour Hasher le mot de passe
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Génère un code à 6 chiffres
const genererCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ─── REGISTER ────────────────────────────────────────

//exports.register rend cette fonction accessible depuis d'autres fichiers (les routes l'importeront). async parce qu'on va faire des opérations en base de données. Le paramètre next sert à passer les erreurs au middleware d'erreur global.

exports.register = async (req, res, next) => {
  try {
    const { nom, email, motDePasse, role, typeCompte, nomEntreprise, numeroRC } = req.body;

    // 1. Vérifie si l'email existe déjà
 
    const existant = await User.findOne({ email });
    if (existant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }


    // 2. Hash le mot de passe 
    const motDePasseHash = await bcrypt.hash(motDePasse, 12); 

    // 3. Génère un code de vérification valable 10 minutes
    const code = genererCode();
    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    // 4. Crée l'utilisateur en base
    const user = await User.create({
      nom,
      email,
      motDePasseHash,
      role: role || 'client',
      typeCompte: typeCompte || 'particulier',
      nomEntreprise,
      numeroRC,
      codeVerification: code,
      codeVerificationExpire: expiration,
      resendVerificationCount: 0,
    });

    // 5. Envoie le code par email
    await sendEmail({
      to: email,
      subject: 'Vérification de votre compte ImmoBook',
      text: `Bonjour ${nom},\n\nVotre code de vérification est : ${code}\n\nIl expire dans 10 minutes.`,
    });

    res.status(201).json({
      message: 'Compte créé. Vérifiez votre email.',
      userId: user._id,
    });

  } catch (erreur) {
    next(erreur);
  }
};

// ─── VERIFY EMAIL ─────────────────────────────────────
exports.verifyEmail = async (req, res, next) => {
  try {
    const { userId, code } = req.body;

    // 1. Cherche l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // 2. Vérifie le code et l'expiration
    if (user.codeVerification !== code) {
      return res.status(400).json({ message: 'Code incorrect.' });
    }
    if (user.codeVerificationExpire < Date.now()) {
      return res.status(400).json({ message: 'Code expiré. Demandez-en un nouveau.' });
    }

    // 3. Marque l'email comme vérifié et supprime le code
    //On supprime le code après usage. 
    // Un code à usage unique ne doit pas pouvoir être réutilisé. 
    // undefined dans Mongoose = supprime le champ du document MongoDB.
    user.emailVerifie = true;
    user.codeVerification = undefined;
    user.codeVerificationExpire = undefined;
    await user.save();

    res.json({ message: 'Email vérifié avec succès. Vous pouvez vous connecter.' });

  } catch (erreur) {
    next(erreur);
  }
};

// ─── RESEND VERIFICATION CODE ────────────────────────
exports.resendVerificationCode = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    if (user.emailVerifie) {
      return res.status(400).json({ message: 'Votre email est déjà vérifié.' });
    }

    const attempts = user.resendVerificationCount || 0;
    if (attempts >= 3) {
      return res.status(400).json({
        message: 'Vous avez atteint la limite de renvoi de code. Contactez le support.',
        remaining: 0,
      });
    }

    const code = genererCode();
    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    user.codeVerification = code;
    user.codeVerificationExpire = expiration;
    user.resendVerificationCount = attempts + 1;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Nouveau code de vérification ImmoBook',
      text: `Bonjour ${user.nom},\n\nVoici votre nouveau code de vérification : ${code}\n\nIl expire dans 10 minutes.`,
    });

    res.json({
      message: 'Nouveau code envoyé. Vérifiez votre boîte mail.',
      remaining: 3 - user.resendVerificationCount,
    });
  } catch (erreur) {
    next(erreur);
  }
};

// ─── LOGIN ────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    // 1. Cherche l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // 2. Vérifie le mot de passe
    const motDePasseValide = await bcrypt.compare(motDePasse, user.motDePasseHash);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // 3. Vérifie que l'email est confirmé
    if (!user.emailVerifie) {
      return res.status(403).json({
        message: 'Vérifiez votre email avant de vous connecter.',
        userId: user._id,
        email: user.email,
        remainingResend: 3 - (user.resendVerificationCount || 0),
      });
    }

    // 4. Génère l'access token (15 minutes) , 
    // JWT (JSON Web Token) : un token signé contenant des données. 
    // Le payload { id, role } permet aux routes protégées de savoir 
    // qui fait la requête et quels sont ses droits sans retourner en base. 
    // Durée de 15 minutes : si le token est volé, il expire vite.
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // 5. Génère le refresh token (7 jours):
    //Pourquoi deux tokens ? L'accessToken voyage dans chaque requête (en-tête HTTP) 
    // — risque d'interception, donc durée courte. 
    // Le refreshToken ne voyage qu'une fois (pour renouveler) 
    // et est stocké dans un cookie sécurisé, jamais accessible en JavaScript.
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // 6. Envoie le refresh token dans un cookie sécurisé
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Répond avec l'access token et les infos de base
    res.json({
      accessToken,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });

  } catch (erreur) {
    next(erreur);
  }
};

// ─── REFRESH TOKEN ────────────────────────────────────
exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token manquant.' });
    }

    // Vérifie le refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Génère un nouvel access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });

  } catch (erreur) {
    return res.status(401).json({ message: 'Refresh token invalide ou expiré.' });
  }
};

// ─── LOGOUT ───────────────────────────────────────────
exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Déconnecté avec succès.' });
};