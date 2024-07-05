const express = require('express');
const router = express.Router();
const NotifiController = require('../controllers/notifiController')

router.get('/get-all', NotifiController.getAllNotifi);

module.exports = router