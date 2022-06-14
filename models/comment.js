const mongoose = require('mongoose')
const formatDistanceToNow = require('date-fns/formatDistanceToNow')

const { Schema } = mongoose

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
  }, { timestamps: true }
)

CommentSchema
  .virtual('formatDate')
  .get(function () {
    return formatDistanceToNow(this.date, { addSuffix: true })
  })

// Export model
module.exports = mongoose.model('Comment', CommentSchema)
