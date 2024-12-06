const express = require('express');
const router = express.Router();
const ZaloPayController = require('../controllers/zaloPayController')


router.post('/create_payment_url', ZaloPayController.createOrder)
router.post('/callback', ZaloPayController.callBack)
module.exports = router