const Post = require('../models/post')
const Like = require('../models/like')
const Saved = require('../models/saved')
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
    }).lean()
    const likes = await Like.find().populate('user')
    const saved = await Saved.find().populate('user')

    // Insert likes and saved posts inside each post
    const updatedPosts = posts.map(post => {
      const postLikes = []
      for (const like of likes) {
        if (post._id.toString() === like.post._id.toString()) {
          postLikes.push(like)
        }
      }
      post.likes = postLikes
      const savedPosts = []
      for (const save of saved) {
        if (post._id.toString() === save.post._id.toString()) {
          savedPosts.push(save)
        }
      }
      post.saved = savedPosts
      return post
    })

    return res.status(200).json({
      count: posts.length,
      posts: updatedPosts
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
    }).lean()

    if (!post) {
      return res.status(404).json({
        error: 'No post found'
      })
    }

    const likes = await Like.find({ post }).populate('user')
    const saved = await Saved.find({ post }).populate('user')

    // Insert likes and saved inside each post
    post.likes = likes
    post.saved = saved

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
      const post = await Post.findById(req.params.postId).populate('author')
      if (!post) {
        return res.status(404).json({
          error: 'No post found'
        })
      }
      if (req.user._id.toString() !== post.author._id.toString()) {
        return res.status(403).json({
          error: 'Forbidden'
        })
      }
      await Post.findByIdAndRemove(req.params.postId)

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

// @desc    Toggle like in one post
// @route   POST /api/v1/post/:postId/like
// @access  Public
exports.toggleLikePost = async (req, res, next) => {
  const user = req.user
  const post = await Post.findById(req.params.postId)

  if (!post) {
    return res.status(404).json({
      error: 'No post found'
    })
  }

  const entry = await Like.findOne({ user, post })

  // Toggle like
  // If entry already exists, remove it
  // Otherwise create it
  if (entry) {
    await Like.findByIdAndRemove(entry._id)
    return res.status(200).json({ msg: 'Deleted' })
  } else {
    try {
      await new Like({
        user,
        post
      }).save()
      return res.status(201).json({ msg: 'Created' })
    } catch (err) {
      return next(err)
    }
  }
}

// @desc    Toggle saved post
// @route   POST /api/v1/post/:postId/save
// @access  Public
exports.toggleSavePost = async (req, res, next) => {
  const user = req.user
  const post = await Post.findById(req.params.postId)

  if (!post) {
    return res.status(404).json({
      error: 'No post found'
    })
  }

  const entry = await Saved.findOne({ user, post })

  // Toggle saved post
  // If entry already exists, remove it
  // Otherwise create it
  if (entry) {
    await Saved.findByIdAndRemove(entry._id)
    return res.status(200).json({ msg: 'Deleted' })
  } else {
    try {
      await new Saved({
        user,
        post
      }).save()
      return res.status(201).json({ msg: 'Created' })
    } catch (err) {
      return next(err)
    }
  }
}
