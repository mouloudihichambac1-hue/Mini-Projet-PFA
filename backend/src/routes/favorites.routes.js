const express = require('express');
const {
  createFavorite,
  getMesFavorites,
  removeFavorite,
} = require('../controllers/favorite.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('client'), createFavorite);
router.get('/mine', authMiddleware, roleMiddleware('client'), getMesFavorites);
router.delete('/:id', authMiddleware, roleMiddleware('client'), removeFavorite);

module.exports = router;
