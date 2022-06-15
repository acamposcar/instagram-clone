const User = require('../models/user')
const Post = require('../models/post')
const validationMiddleware = require('../middleware/validation')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { uploadAvatar } = require('../config/multer')

const expirationDays = 2
const expirationTimeInSeconds = expirationDays * 24 * 60 * 60
const SALT = 10

exports.register = [
  validationMiddleware.name(),
  validationMiddleware.usernamePassword(),
  validationMiddleware.validationResult,

  async (req, res, next) => {
    const userExists = await User.findOne({ username: req.body.username })
    if (userExists) {
      return res.status(400).json({
        error: 'User already exists'
      })
    }
    try {
      const hasedPassword = await bcrypt.hash(req.body.password, SALT)
      const user = await new User({
        name: req.body.name,
        username: req.body.username,
        hash: hasedPassword,
        salt: SALT
      }).save()

      const token = generateToken(user, expirationTimeInSeconds)

      return res.status(201).json({
        data: { token, user: user.toAuthJSON, expiresIn: expirationTimeInSeconds }
      })
    } catch (err) {
      return next(err)
    }
  }
]

exports.login = [
  validationMiddleware.usernamePassword(),
  validationMiddleware.validationResult,

  async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) return next(err)

      if (!user) {
        return res.status(400).json({
          error: 'Invalid credentials'
        })
      }

      const token = generateToken(user, expirationTimeInSeconds)

      return res.status(201).json({
        data: { token, user: user.toAuthJSON, expiresIn: expirationTimeInSeconds }
      })
    })(req, res)
  }
]

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    const posts = await Post.find({ author: user }).populate('author').sort({ createdAt: -1 })

    return res.status(200).json({
      count: posts.length,
      posts,
      user
    })
  } catch (err) {
    return next(err)
  }
}

exports.currentUser = (req, res, next) => {
  return res.status(200).json({
    data: req.user
  })
}

exports.uploadAvatar = [
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

const generateToken = (user, expirationTimeInSeconds) => {
  const payload = {
    sub: user._id,
    username: user.username
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expirationTimeInSeconds })
}
