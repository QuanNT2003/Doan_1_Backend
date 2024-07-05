const express = require('express');
const router = express.Router();
const PaypalController = require('../controllers/paypalController')


router.post('/create-paypal-order', PaypalController.createOrderPayPal)

module.exports = router