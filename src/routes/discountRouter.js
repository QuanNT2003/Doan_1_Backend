const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/discountControllers')

router.get('/get-all', DiscountController.getAllDiscount);
router.get('/get-details/:id', DiscountController.getDetailDiscount)
router.post('/add', DiscountController.createDiscount)
router.delete('/delete-discount/:id', DiscountController.deleteDiscount)
router.put('/update/:id', DiscountController.updateDiscount)
router.get('/get-discount-user/:id', DiscountController.getDiscountForUser)
module.exports = router