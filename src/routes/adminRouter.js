const AdminController = require('../controllers/adminControllers')
const express = require('express');
const router = express.Router();


router.post('/login', AdminController.login)
router.post('/refresh-token', AdminController.refreshToken);
module.exports = router