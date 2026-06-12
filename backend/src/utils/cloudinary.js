const cloudinary = require('cloudinary').v2;
const CloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'immobook/projects',
  allowedFormats: ['jpg', 'png', 'webp'], 
});

const upload = multer({ storage, limits: { files: 10 } });

module.exports = { cloudinary, upload };