const Post = require('../models/post')
const Like = require('../models/like')
const Saved = require('../models/saved')
const Following = require('../models/following')
const validationMiddleware = require('../middleware/validation')
const { uploadImage } = require('../config/multer')

// @desc    Get all posts
// @route   GET /api/v1/posts/
// @access  Users
exports.getAllPosts = async (req, res, next) => {
  try {
    let posts, likes, saved
    await Promise.all([
      (async () => {
        posts = await Post.find().populate('author').sort({ createdAt: -1 }).populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'author'
          }
        }).lean()
      })(),
      (async () => {
        likes = await Like.find().populate('user')
      })(),
      (async () => {
        saved = await Saved.find().populate('user')
      })()
    ])

    const updatedPosts = transformPosts(posts, likes, saved)

    return res.status(200).json({
      count: posts.length,
      posts: updatedPosts
    })
  } catch (err) {
    return next(err)
  }
}

// @desc    Get all the publications of the people you are following
// @route   GET /api/v1/posts/following
// @access  Users
exports.getFollowingPosts = async (req, res, next) => {
  try {
    let posts, likes, saved

    // Get following users
    const following = await Following.find({ user: req.user }).populate('following').sort({ createdAt: -1 })
    const followingIds = new Set()

    // Add following users IDs and own user Id
    followingIds.add(req.user)
    for (const item of following) {
      followingIds.add(item.following)
    }

    await Promise.all([
      (async () => {
        posts = await Post.find({ author: { $in: Array.from(followingIds) } }).populate('author').sort({ createdAt: -1 }).populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'author'
          }
        }).lean()
      })(),
      (async () => {
        likes = await Like.find().populate('user')
      })(),
      (async () => {
        saved = await Saved.find().populate('user')
      })()
    ])

    const updatedPosts = transformPosts(posts, likes, saved)

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
// @access  Users
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
// @access  Users
exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId
    let post, likes, saved
    await Promise.all([
      (async () => {
        post = await Post.findById(postId).populate('author').populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'author'
          }
        }).lean()
      })(),
      (async () => {
        likes = await Like.find({ post: postId }).populate('user').sort({ createdAt: 1 })
      })(),
      (async () => {
        saved = await Saved.find({ post: postId }).populate('user')
      })()
    ])

    if (!post) {
      return res.status(404).json({
        error: 'No post found'
      })
    }

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
// @access  Users
exports.deletePost = [
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId).populate('author')
      if (!post) {
        return res.status(404).json({
          error: 'No post found'
        })
      }
      // Check if auth user is the author of the post
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
// @access  Users
exports.toggleLikePost = async (req, res, next) => {
  try {
    let post, entry
    const user = req.user
    const postId = req.params.postId
    await Promise.all([
      (async () => {
        post = await Post.findById(postId)
      })(),
      (async () => {
        entry = await Like.findOne({ user, post: postId })
      })()
    ])

    if (!post) {
      return res.status(404).json({
        error: 'No post found'
      })
    }
    // Toggle like
    // If entry already exists, remove it
    // Otherwise create it
    if (entry) {
      await Like.findByIdAndRemove(entry._id)
      return res.status(200).json({ msg: 'Deleted' })
    } else {
      await new Like({
        user,
        post
      }).save()
      return res.status(201).json({ msg: 'Created' })
    }
  } catch (err) {
    return next(err)
  }
}

// @desc    Toggle saved post
// @route   POST /api/v1/post/:postId/save
// @access  Users
exports.toggleSavePost = async (req, res, next) => {
  try {
    let post, entry
    const user = req.user
    const postId = req.params.postId
    await Promise.all([
      (async () => {
        post = await Post.findById(postId)
      })(),
      (async () => {
        entry = await Saved.findOne({ user, post: postId })
      })()
    ])

    if (!post) {
      return res.status(404).json({
        error: 'No post found'
      })
    }
    // Toggle save
    // If entry already exists, remove it
    // Otherwise create it
    if (entry) {
      await Saved.findByIdAndRemove(entry._id)
      return res.status(200).json({ msg: 'Deleted' })
    } else {
      await new Saved({
        user,
        post
      }).save()
      return res.status(201).json({ msg: 'Created' })
    }
  } catch (err) {
    return next(err)
  }
}

const transformPosts = (posts, likes, saved) => {
  // Insert likes and saved posts inside each post

  return posts.map(post => {
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
}
