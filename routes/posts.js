const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

router.route('/').get(postController.getAllPosts).post(postController.addPost)
router.route('/following').get(postController.getFollowingPosts)
router.route('/:postId').get(postController.getPost).delete(postController.deletePost)
router.route('/:postId/save').post(postController.toggleSavePost)
router.route('/:postId/like').post(postController.toggleLikePost)
router.route('/:postId/comments').post(commentController.addComment)

module.exports = router
