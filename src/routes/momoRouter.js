const express = require('express');
const router = express.Router();
const MomoController = require('../controllers/momoControllers')


router.post('/create_payment_url', MomoController.createOrder)
module.exports = router