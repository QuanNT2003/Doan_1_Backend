const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productControllers')

router.get('/get-all', ProductController.getAllProduct);
router.get('/get-details/:id', ProductController.getDetailProduct)
router.get('/get-related-products/:id', ProductController.getRelatedProducts)
router.post('/add', ProductController.createProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)
router.put('/update/:id', ProductController.updateProduct)
module.exports = router