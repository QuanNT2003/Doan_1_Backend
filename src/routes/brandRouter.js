const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandControllers')

router.get('/get-all', BrandController.getAllBrand);
router.get('/get-details/:id', BrandController.getDetailBrand)
router.get('/get-nation', BrandController.getNation)
router.post('/add', BrandController.createBrand)
router.delete('/delete-brand/:id', BrandController.deleteBrand)
router.put('/update/:id', BrandController.updateBrand)
module.exports = router