const express = require('express');
const router = express.Router();
const ColorController = require('../controllers/colorControllers')

router.get('/get-all', ColorController.getAllColor);


module.exports = router