const AdminController = require('../controllers/adminControllers')
const express = require('express');
const router = express.Router();


router.post('/login', AdminController.login)

module.exports = router