const express = require('express');
const router = express.Router();
const VerisonController = require('../controllers/versionControllers')

router.get('/get-all', VerisonController.getAllVersion);
router.get('/get-size/:id', VerisonController.getAllSize);
router.get('/get-color/:id', VerisonController.getAllColor);
module.exports = router