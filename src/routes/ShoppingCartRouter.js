const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/shoppingCartControllers')

router.get('/get-all', ShoppingCartController.getAllShoppingCart);
router.post('/add', ShoppingCartController.createShoppingCart)
router.delete('/delete-ShoppingCart/:id', ShoppingCartController.deleteShoppingCart)
router.put('/update/:id', ShoppingCartController.updateShoppingCart)
module.exports = router