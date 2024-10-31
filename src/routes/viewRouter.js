const express = require('express');
const router = express.Router();
const ViewController = require('../controllers/viewControllers')

router.get('/get-all', ViewController.getAllView);
router.post('/createView', ViewController.createView)
router.delete('/deleteView/:id', ViewController.deleteView)
router.put('/update/:id', ViewController.updateView)
module.exports = router