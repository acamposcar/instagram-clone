const mongoose = require('mongoose')
const Message = require('./message')

const { Schema } = mongoose

const ConversationSchema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: String }
  }, { timestamps: true })

ConversationSchema.pre('findOneAndRemove', function (next) {
  const id = this.getQuery()._id
  Message.deleteMany({ conversation: id }, next)
})

module.exports = mongoose.model('Conversation', ConversationSchema)
