const express = require('express');
const router = express.Router();
const SizeController = require('../controllers/sizeController')

router.get('/get-all', SizeController.getAllSize);


module.exports = router