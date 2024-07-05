const express = require('express');
const router = express.Router();
const VNPayController = require('../controllers/vnpayController')


router.post('/create_payment_url', VNPayController.createOrder)

module.exports = router