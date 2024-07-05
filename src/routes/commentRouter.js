const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentControllers')

router.get('/get-all', CommentController.getAllComment);
router.post('/add', CommentController.createComment)
router.delete('/delete-comment/:id', CommentController.deleteComment)
router.put('/update/:id', CommentController.updateComment)
module.exports = router