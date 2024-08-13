const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productControllers');
const { authMiddleware } = require('../middleware/authMiddleware');

// router.get('/get-all', authMiddleware, ProductController.getAllProduct);
router.get('/get-all', ProductController.getAllProduct);
router.get('/get-details/:id', ProductController.getDetailProduct)
router.get('/get-related-products/:id', ProductController.getRelatedProducts)
router.post('/add', authMiddleware, ProductController.createProduct)
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct)
router.put('/update/:id', authMiddleware, ProductController.updateProduct)
module.exports = router