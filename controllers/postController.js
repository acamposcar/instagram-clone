const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')
const validationMiddleware = require('../middleware/validation')
const { uploadImage } = require('../config/multer')

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author').sort({ createdAt: -1 }).populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'author'
      }
    }).populate({
      path: 'likes',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'author'
      }
    })
    return res.status(200).json({
      count: posts.length,
      posts
    })
  } catch (err) {
    return next(err)
  }
}

// @desc    Add post
// @route   POST /api/v1/posts
// @access  Private
exports.addPost = [
  uploadImage,
  validationMiddleware.post(),
  validationMiddleware.validationResult,
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        error: 'Error uploading file'
      })
    }

    try {
      const post = await new Post({
        content: req.body.content,
        location: req.body.location,
        author: req.user._id,
        image: req.file.filename
      }).save()
      return res.status(200).json(post)
    } catch (err) {
      return next(err)
    }
  }
]

// @desc    Get one post
// @route   GET /api/v1/post/:postId
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author').populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'author'
      }
    }).populate({
      path: 'likes',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'author'
      }
    })
    if (!post) {
      return res.status(404).json({
        error: 'No post found'
      })
    }
    return res.status(200).json(post)
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid Post ID'
      })
    }
    return next(err)
  }
}

// @desc    Delete one post
// @route   DELETE /api/v1/post/:postId
// @access  Public
exports.deletePost = [
  async (req, res, next) => {
    try {
      const post = await Post.findByIdAndRemove(req.params.postId)
      if (!post) {
        return res.status(404).json({
          error: 'No post found'
        })
      }
      return res.status(200).json({
        data: {}
      })
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({
          error: 'Invalid post ID'
        })
      }
      return next(err)
    }
  }
]

// @desc    Update post
// @route   PUT /api/v1/posts/:postId
// @access  Private
exports.updatePost = [
  uploadImage,
  validationMiddleware.post(),
  validationMiddleware.validationResult,

  async (req, res, next) => {
    const post = {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published === 'true',
      summary: req.body.summary
    }
    if (req.file) post.image = req.file.filename

    try {
      // Update post
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, { new: true })
      if (!updatedPost) {
        return res.status(404).json({
          error: 'No post found'
        })
      }
      return res.status(200).json(updatedPost)
    } catch (err) {
      return next(err)
    }
  }

]
