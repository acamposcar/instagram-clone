const User = require('../models/user')
const validationMiddleware = require('../middleware/validation')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        data: { token, user: user.toJSON, expiresIn: expirationTimeInSeconds }
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
        data: { token, user: user.toJSON, expiresIn: expirationTimeInSeconds }
      })
    })(req, res)
  }
]

exports.validateToken = (req, res, next) => {
  return res.status(200).json(req.user.toJSON)
}

const generateToken = (user, expirationTimeInSeconds) => {
  const payload = {
    sub: user._id,
    username: user.username
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expirationTimeInSeconds })
}
