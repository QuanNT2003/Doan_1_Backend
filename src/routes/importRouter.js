const express = require('express');
const router = express.Router();
const ImportController = require('../controllers/importControllers')

router.get('/get-all', ImportController.getAllImport);
router.post('/add', ImportController.createImport)
router.get('/get-details/:id', ImportController.getDetailImport);
module.exports = router