const User = require('../models/user')
const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Following = require('../models/following')
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
    try {
      const userExists = await User.findOne({ username: req.body.username })
      if (userExists) {
        return res.status(400).json({
          error: 'User already exists'
        })
      }
      const hasedPassword = await bcrypt.hash(req.body.password, SALT)
      const user = await new User({
        name: req.body.name,
        username: req.body.username,
        avatar: initRandomAvatar(),
        bio: "What's up!",
        hash: hasedPassword,
        salt: SALT
      }).save()

      initFollowing(user)
      initMessage(user)
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

const initFollowing = async (newUser) => {
  // Follow admin users when a new user is created
  const admins = await User.find({ roles: ['admin'] })
  for (const admin of admins) {
    await new Following({
      user: newUser,
      following: admin
    }).save()
  }
}

const initMessage = async (newUser) => {
  // Send welcome message
  const myUser = await User.findOne({ username: 'acampos' })
  const messageContent = `Thank you for testing my project. 
        Please take a look and try as many features as you can. 
        You can reply to this message if you want, but I may not see it. 
        To get in touch, send me an email at acamposcar@gmail.com`

  const conversation = await new Conversation({
    participants: [myUser, newUser],
    lastMessage: messageContent
  }).save()

  await new Message({
    content: messageContent,
    conversation: conversation._id,
    sender: myUser
  }).save()
}

const initRandomAvatar = () => {
  const imageCount = 9
  return `https://res.cloudinary.com/dr2slpzm1/image/upload/v1655814477/instagram-clone/default/avatar-default-${Math.floor(Math.random() * imageCount)}.jpg`
}
