const express = require('express');
const router = express.Router();
const ZaloPayController = require('../controllers/zaloPayController')


router.post('/create_payment_url', ZaloPayController.createOrder)

module.exports = router