const FakedaaController = require('../controllers/fakedateController')
const express = require('express');
const router = express.Router();


router.get('/review', FakedaaController.review)

module.exports = router