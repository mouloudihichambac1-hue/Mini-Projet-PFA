const express = require('express');
const { createReview, getAvisProjet } = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/project/:projetId', getAvisProjet);

module.exports = router;
