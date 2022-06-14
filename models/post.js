const mongoose = require('mongoose')
const formatDistanceToNow = require('date-fns/formatDistanceToNow')

const { Schema } = mongoose

const PostSchema = new Schema(
  {
    location: { type: String },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }
  }, { timestamps: true }
)

PostSchema
  .virtual('formatDate')
  .get(function () {
    return formatDistanceToNow(this.date, { addSuffix: true })
  })

// Export model
module.exports = mongoose.model('Post', PostSchema)
