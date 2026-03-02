const express = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const router = express.Router();
const { protect } = require('../middleware/protect')
const { authorize } = require('../middleware/authorize');


// POSTS
router.post('/', protect, postController.addPost);
router.get('/', postController.getPosts);
router.get('/:postId', postController.getPostById);
router.patch('/:postId', protect, postController.updatePost);
router.delete('/:postId', protect, postController.deletePost);


// COMMENTS
router.post('/:postId/comments', protect, commentController.addComment);
router.get('/:postId/comments', commentController.getComments);
router.patch('/:postId/comments/:commentId', protect, commentController.updateComment);
router.delete('/:postId/comments/:commentId', protect, commentController.deleteComment);

module.exports = router;
