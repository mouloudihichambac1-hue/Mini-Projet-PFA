const Favorite = require('../models/Favorite');
const Project = require('../models/Project');

exports.createFavorite = async (req, res, next) => {
  try {
    const { projetId } = req.body;

    const projet = await Project.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable.' });
    }

    const existe = await Favorite.findOne({ clientId: req.user._id, projetId });
    if (existe) {
      return res.status(400).json({ message: 'Ce projet est déjà dans vos favoris.' });
    }

    const favori = await Favorite.create({
      clientId: req.user._id,
      projetId,
    });

    res.status(201).json(favori);
  } catch (erreur) {
    next(erreur);
  }
};

exports.getMesFavorites = async (req, res, next) => {
  try {
    const favoris = await Favorite.find({ clientId: req.user._id })
      .populate('projetId', 'titre prix ville type adresse surface nbChambres images statut')
      .sort({ createdAt: -1 });

    res.json(favoris);
  } catch (erreur) {
    next(erreur);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const favori = await Favorite.findById(req.params.id);
    if (!favori) {
      return res.status(404).json({ message: 'Favori introuvable.' });
    }

    if (favori.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Action non autorisée.' });
    }

    await favori.deleteOne();
    res.json({ message: 'Favori supprimé avec succès.' });
  } catch (erreur) {
    next(erreur);
  }
};
