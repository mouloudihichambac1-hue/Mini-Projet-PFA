const express = require('express');
const {
  createReservation,
  getMesReservations,
  annulerReservation,
  getReservationsPromoteur,
  getReservationsProjet,
} = require('../controllers/reservation.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReservation);
router.get('/mine', authMiddleware, getMesReservations);
router.get('/promoter', authMiddleware, roleMiddleware('promoteur'), getReservationsPromoteur);
router.delete('/:id', authMiddleware, annulerReservation);
router.get('/project/:projetId', authMiddleware, roleMiddleware('promoteur'), getReservationsProjet);

module.exports = router;
