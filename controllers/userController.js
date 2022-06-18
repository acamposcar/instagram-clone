const User = require('../models/user')
const Post = require('../models/post')
const Saved = require('../models/saved')
const Like = require('../models/like')
const Following = require('../models/following')
const { uploadAvatar } = require('../config/multer')

// @desc    Get user posts and information
// @route   GET /api/v1/users/:username
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    const following = await Following.find({ user }).populate('following').sort({ createdAt: -1 })
    const followers = await Following.find({ following: user }).populate('user').sort({ createdAt: -1 })
    const likes = await Like.find().populate('user')

    const savedPosts = await Saved.find({ user }).populate('post').sort({ createdAt: -1 }).lean()
    const posts = await Post.find({ author: user }).populate('author').sort({ createdAt: -1 }).lean()

    // Insert likes and saved posts inside each post
    const updatedPosts = posts.map(post => {
      const postLikes = []
      for (const like of likes) {
        if (post._id.toString() === like.post._id.toString()) {
          postLikes.push(like)
        }
      }
      post.likes = postLikes
      return post
    })
    const updateSaved = savedPosts.map(savedPost => {
      const postLikes = []
      for (const like of likes) {
        if (savedPost.post._id.toString() === like.post._id.toString()) {
          postLikes.push(like)
        }
      }
      savedPost.post.likes = postLikes
      return savedPost.post
    })
    return res.status(200).json({
      count: posts.length,
      posts: updatedPosts,
      user: user.toJSON,
      following,
      followers,
      saved: updateSaved
    })
  } catch (err) {
    return next(err)
  }
}

// @desc    Update user profile image
// @route   POST /api/v1/users/:username
// @access  Public
exports.updateAvatar = [
  uploadAvatar,
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        error: 'Error uploading file'
      })
    }

    const user = {
      avatar: req.file.filename
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true })
      if (!updatedUser) {
        return res.status(404).json({
          error: 'No user found'
        })
      }
      return res.status(200).json({
        data: req.file.filename
      })
    } catch (err) {
      return next(err)
    }
  }
]

// @desc    Update user profile info
// @route   PUT /api/v1/users/:username
// @access  Public
exports.updateProfile = [
  async (req, res, next) => {
    if (req.user.username !== req.params.username) {
      return res.status(403).json({
        error: 'Forbidden'
      })
    }
    const user = {
      name: req.body.name,
      bio: req.body.bio
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true })
      if (!updatedUser) {
        return res.status(404).json({
          error: 'No user found'
        })
      }
      console.log(updatedUser)

      return res.status(200).json(updatedUser)
    } catch (err) {
      return next(err)
    }
  }
]

// @desc    Update user profile info
// @route   POST /api/v1/users/:username/follow
// @access  Public
exports.followUser = async (req, res, next) => {
  const user = req.user
  const following = await User.findOne({ username: req.params.username })

  if (!following) {
    return res.status(404).json({
      error: 'No user found'
    })
  }

  if (user.username === following.username) {
    return res.status(400).json({
      error: "You can't follow yourself!"
    })
  }

  const entry = await Following.findOne({ user, following })

  // Toggle following user
  // If entry already exists, remove it
  // Otherwise create it
  if (entry) {
    await Following.findByIdAndRemove(entry._id)
    return res.status(200).json({ msg: 'Deleted' })
  } else {
    try {
      await new Following({
        user,
        following
      }).save()
      return res.status(201).json({ msg: 'Created' })
    } catch (err) {
      return next(err)
    }
  }
}
