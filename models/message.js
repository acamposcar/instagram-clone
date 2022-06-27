const mongoose = require('mongoose')

const { Schema } = mongoose

const MessageSchema = new Schema(
  {
    content: { type: String, required: true },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    read: { type: Boolean, default: false }
  }, { timestamps: true })

module.exports = mongoose.model('Message', MessageSchema)
