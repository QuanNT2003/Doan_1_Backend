const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers')

router.get('/get-all', UserController.getAllUser);
router.get('/get-details/:id', UserController.getDetailUser)
router.post('/add', UserController.createUser)
router.post('/login', UserController.login)
router.post('/send-otp', UserController.sendOtp)
router.delete('/delete-user/:id', UserController.deleteUser)
router.put('/update/:id', UserController.updateUser)
module.exports = router