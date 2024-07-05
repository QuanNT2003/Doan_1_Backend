const express = require('express');
const router = express.Router();
const DiscountCartController = require('../controllers/discountCartControllers')

router.get('/get-all', DiscountCartController.getAllDiscountCart);
router.post('/add', DiscountCartController.createDiscountCart)

module.exports = router