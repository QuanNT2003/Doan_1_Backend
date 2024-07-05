const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imagesControllers')

router.post('/upload', ImageController.uploadImages);
router.post('/remove', ImageController.deleteImages)
module.exports = router