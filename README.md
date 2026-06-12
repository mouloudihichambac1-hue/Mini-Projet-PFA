# 🏡 ImmoBook v2 - Application Web de Gestion Immobilière

ImmoBook v2 est une plateforme web full-stack (MERN) moderne et sécurisée mettant en relation des clients et des promoteurs immobiliers au Maroc. Cette version 2 introduit une architecture robuste, une messagerie en temps réel, un système de réservation avancé et un tableau de bord analytique.

## ✨ Fonctionnalités Principales

- **Authentification Sécurisée :** Double token JWT (Access 15m / Refresh 7j en cookie HttpOnly) et vérification d'email par OTP.
- **Espace Promoteur :** Dashboard analytique, gestion CRUD des projets (upload d'images vers Cloudinary), gestion des réservations et planification de rendez-vous.
- **Espace Client :** Recherche filtrée multicritères, ajout aux favoris, système de comparaison de biens, et outil de réservation.
- **Messagerie Temps Réel :** Chat intégré via Socket.IO entre clients et promoteurs.

## 🛠️ Stack Technique

- **Frontend :** React.js (Vite), Tailwind CSS, React Router, Lucide Icons.
- **Backend :** Node.js, Express.js.
- **Base de données :** MongoDB & Mongoose.
- **Services tiers :** Cloudinary (Stockage images), Nodemailer (Envoi d'emails SMTP Gmail), Socket.IO (WebSockets).

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (en local ou un cluster Atlas)
- Un compte [Cloudinary](https://cloudinary.com/) (pour les images)
- Un mot de passe d'application [Google/Gmail](https://myaccount.google.com/apppasswords) (pour l'envoi des OTP)

## 🚀 Installation et Configuration

### 1. Cloner le dépôt
\`\`\`bash
git clone https://github.com/VOTRE_NOM_UTILISATEUR/ImmoBook-v2.git
cd ImmoBook-v2
\`\`\`

### 2. Configuration du Backend
\`\`\`bash
cd backend
npm install
\`\`\`

Créez un fichier `.env` dans le dossier `backend` et ajoutez les variables suivantes :
\`\`\`env
# Serveur
PORT=3001
NODE_ENV=development

# Base de données
MONGO_URI=mongodb://127.0.0.1:27017/immobook_v2

# Sécurité (JWT)
JWT_SECRET=votre_cle_secrete_super_longue
JWT_REFRESH_SECRET=votre_cle_refresh_super_longue

# Cloudinary (Images)
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# Nodemailer (Emails OTP via Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_FROM="ImmoBook Support <votre.email@gmail.com>"
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application_16_lettres
\`\`\`

### 3. Configuration du Frontend
Ouvrez un nouveau terminal et exécutez :
\`\`\`bash
cd frontend
npm install
\`\`\`

## 🏃‍♂️ Démarrage du projet

**Pour lancer le Backend :**
\`\`\`bash
cd backend
npm run dev
\`\`\`
*Le serveur démarrera sur http://localhost:3001*

**Pour lancer le Frontend :**
\`\`\`bash
cd frontend
npm run dev
\`\`\`
*L'application React démarrera généralement sur http://localhost:5173*

## 👥 Auteurs

Projet réalisé par l'équipe ImmoBook dans le cadre du projet de fin de semestre à l'INPT :
- ECHAHBAOUI Maryam
- GHANNAM Othman
- MALIKI Ouiame
- MOULOUDI Hicham

Encadré par : Pr. KANDOUSSI El Mehdi