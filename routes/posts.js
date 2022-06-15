const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const isAuth = require('../middleware/auth').isAuth

router.route('/').get(isAuth, postController.getAllPosts).post(isAuth, postController.addPost)
router.route('/:postId').get(isAuth, postController.getPost)

module.exports = router
