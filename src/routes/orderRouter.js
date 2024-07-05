const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderControllers')

router.get('/get-all', OrderController.getAllOrder);
router.get('/get-details/:id', OrderController.getDetailOrder);
router.get('/get-user', OrderController.getAllUser);
router.post('/add', OrderController.createOrder);
router.put('/update/:id', OrderController.updateOrder);
module.exports = router