const mongoose = require('mongoose')
const formatDistanceToNow = require('date-fns/formatDistanceToNow')

const { Schema } = mongoose

const PostSchema = new Schema(
  {
    content: { type: String },
    location: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }]

  }, { timestamps: true }
)

PostSchema
  .virtual('formatDate')
  .get(function () {
    return formatDistanceToNow(this.date, { addSuffix: true })
  })

// Export model
module.exports = mongoose.model('Post', PostSchema)
