const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/discountControllers')
const { authMiddleware } = require('../middleware/authMiddleware');
router.get('/get-all', DiscountController.getAllDiscount);
router.get('/get-details/:id', DiscountController.getDetailDiscount)
router.post('/add', authMiddleware, DiscountController.createDiscount)
router.delete('/delete-discount/:id', authMiddleware, DiscountController.deleteDiscount)
router.put('/update/:id', authMiddleware, DiscountController.updateDiscount)
router.get('/get-discount-user/:id', DiscountController.getDiscountForUser)
module.exports = router