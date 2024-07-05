const express = require('express');
const router = express.Router();
const ReturnController = require('../controllers/returnControllers')

router.get('/get-all', ReturnController.getAllReturn);
router.get('/get-details/:id', ReturnController.getDetailReturn);
router.get('/get-user', ReturnController.getAllUser);
router.post('/add', ReturnController.createReturn);
router.put('/update/:id', ReturnController.updateReturn);
module.exports = router