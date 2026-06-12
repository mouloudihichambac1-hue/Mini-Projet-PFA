const Reservation = require('../models/Reservation');
const Project = require('../models/Project');

// ─── CRÉER UNE RÉSERVATION ─────────────────────────────
exports.createReservation = async (req, res, next) => {
  try {
    const { projetId, acompte } = req.body;

    // 1. Vérifie que le projet existe
    const projet = await Project.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable.' });
    }

    // 2. Vérifie que le projet est disponible
    if (projet.statut === 'vendu') {
      return res.status(400).json({ message: 'Ce bien est déjà vendu.' });
    }

    // 3. Vérifie que le client n'a pas déjà réservé ce projet
    const dejaReserve = await Reservation.findOne({
      clientId: req.user._id,
      projetId,
      statut: { $ne: 'annule' },
    });
    if (dejaReserve) {
      return res.status(400).json({ message: 'Vous avez déjà réservé ce bien.' });
    }

    // 4. Crée la réservation
    const reservation = await Reservation.create({
      clientId: req.user._id,
      projetId,
      acompte,
    });

    res.status(201).json(reservation);

  } catch (erreur) {
    next(erreur);
  }
};

// ─── MES RÉSERVATIONS ──────────────────────────────────
exports.getMesReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ clientId: req.user._id })
      .populate('projetId', 'titre ville prix statut')
      .sort({ createdAt: -1 });

    res.json(reservations);

  } catch (erreur) {
    next(erreur);
  }
};

// ─── SUPPRIMER / ANNULER UNE RÉSERVATION ────────────────
exports.annulerReservation = async (req, res, next) => {
  try {
    // 🚀 AJOUT : On ramène les infos du projet pour identifier le promoteur
    const reservation = await Reservation.findById(req.params.id).populate('projetId');

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable.' });
    }

    // 🚀 AJOUT : Vérification des droits (Client OU Promoteur)
    const isClient = reservation.clientId.toString() === req.user._id.toString();
    const isPromoteur = reservation.projetId && reservation.projetId.promoteurId.toString() === req.user._id.toString();

    // Si ce n'est ni le client, ni le promoteur du projet concerné, on bloque.
    if (!isClient && !isPromoteur) {
      return res.status(403).json({ message: 'Action non autorisée. Vous ne pouvez pas supprimer cette réservation.' });
    }

    // 🚀 MODIFICATION : Suppression définitive de la base de données (pour ne plus la fetcher)
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({ message: 'Réservation supprimée définitivement avec succès.' });

  } catch (erreur) {
    next(erreur);
  }
};

// ─── RÉSERVATIONS POUR UN PROMOTEUR ───────────────────
exports.getReservationsPromoteur = async (req, res, next) => {
  try {
    const projets = await Project.find({ promoteurId: req.user._id }).select('_id');
    const projetIds = projets.map((projet) => projet._id);

    const reservations = await Reservation.find({ projetId: { $in: projetIds } })
      .populate('clientId', 'nom email')
      .populate('projetId', 'titre ville prix statut')
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (erreur) {
    next(erreur);
  }
};

// ─── RÉSERVATIONS D'UN PROJET (promoteur) ─────────────
exports.getReservationsProjet = async (req, res, next) => {
  try {
    const projet = await Project.findById(req.params.projetId);

    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable.' });
    }

    // Vérifie que c'est bien le promoteur du projet
    if (projet.promoteurId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Action non autorisée.' });
    }

    const reservations = await Reservation.find({ projetId: req.params.projetId })
      .populate('clientId', 'nom email')
      .sort({ createdAt: -1 });

    res.json(reservations);

  } catch (erreur) {
    next(erreur);
  }
};