const Conversation = require('../models/conversation')
const Message = require('../models/message')
const Following = require('../models/following')
const validationMiddleware = require('../middleware/validation')

// @desc    Get all conversations
// @route   GET /api/v1/chat/
// @access  Users
exports.getConversations = async (req, res, next) => {
  try {
    let following, conversations
    await Promise.all([
      (async () => {
        following = await Following.find({ user: req.user }).populate('following')
      })(),
      (async () => {
        conversations = await Conversation.find({ participants: req.user._id })
          .populate('participants').sort({ updatedAt: -1 })
      })()
    ])
    return res.status(200).json({
      conversations, following
    })
  } catch (err) {
    return next(err)
  }
}

// @desc    Add conversation
// @route   POST /api/v1/chat
// @access  Users
exports.createConversation = async (req, res, next) => {
  const contactId = req.body.contact
  try {
    const conversationExist = await Conversation.findOne({ participants: { $all: [req.user._id, contactId] } })

    if (conversationExist) {
      return res.status(200).json(conversationExist)
    }
    const conversation = await new Conversation({
      participants: [contactId, req.user._id]
    }).save()
    return res.status(200).json(conversation)
  } catch (err) {
    return next(err)
  }
}

// @desc    Get messages for one conversation
// @route   GET /api/v1/chat/:conversationId
// @access  Users
exports.getMessages = async (req, res, next) => {
  const conversationId = req.params.conversationId
  try {
    const messages = await Message.find({ conversation: conversationId }).populate('sender').sort({ createdAt: -1 })

    return res.status(200).json(
      messages
    )
  } catch (err) {
    return next(err)
  }
}

// @desc    Create message
// @route   POST /api/v1/chat/:conversationId
// @access  Users
exports.sendMessage = [
  validationMiddleware.message(),
  validationMiddleware.validationResult,
  async (req, res, next) => {
    const conversationId = req.params.conversationId
    const content = req.body.content

    try {
      const conversationExist = await Conversation.findById(conversationId)
      if (!conversationExist) {
        return res.status(404).json({
          error: 'No conversation found'
        })
      }

      let message
      await Promise.all([
        (async () => {
          message = await new Message({
            content,
            conversation: conversationId,
            sender: req.user._id
          }).save()
        })(),
        (async () => {
          await Conversation.findByIdAndUpdate(conversationId, { lastMessage: content }, { new: true })
        })()
      ])

      return res.status(200).json(message)
    } catch (err) {
      return next(err)
    }
  }
]
