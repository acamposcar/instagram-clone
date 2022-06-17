const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const isAdmin = require('../middleware/auth').isAdmin

router.route('/').get(postController.getAllPosts).post(postController.addPost)
router.route('/:postId').get(postController.getPost).delete(isAdmin, postController.deletePost)
router.route('/:postId/save').post(postController.toggleSavePost)
router.route('/:postId/like').post(postController.toggleLikePost)
router.route('/:postId/comments').post(commentController.addComment)
router.route('/:postId/comments/:commentId').delete(isAdmin, commentController.deleteComment)

module.exports = router
