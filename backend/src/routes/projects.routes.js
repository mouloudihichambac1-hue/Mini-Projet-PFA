const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadImages,
} = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { upload: cloudinaryUpload } = require('../utils/cloudinary');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', authMiddleware, roleMiddleware('promoteur'), createProject);
router.put('/:id', authMiddleware, roleMiddleware('promoteur'), updateProject);
router.delete('/:id', authMiddleware, roleMiddleware('promoteur'), deleteProject);
router.post('/:id/images', authMiddleware, roleMiddleware('promoteur'), cloudinaryUpload.array('images', 10), uploadImages);

module.exports = router;
