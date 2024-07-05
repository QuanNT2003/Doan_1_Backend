const express = require('express');
const router = express.Router();
const OrderProgressController = require('../controllers/orderProgressControllers')

router.get('/get-for-order/:id', OrderProgressController.getAllOrderProgress);
router.get('/get-for-return/:id', OrderProgressController.getAllReturnProgress);
module.exports = router

