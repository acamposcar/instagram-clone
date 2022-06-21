const mongoose = require('mongoose')
const formatDistanceToNow = require('date-fns/formatDistanceToNow')
const Saved = require('./saved')
const Like = require('./like')

const { Schema } = mongoose

const PostSchema = new Schema(
  {
    content: { type: String },
    location: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  }, { timestamps: true }
)

PostSchema.pre('findOneAndRemove', function (next) {
  const id = this.getQuery()._id
  Saved.deleteMany({ post: id }, next)
  Like.deleteMany({ post: id }, next)
})

PostSchema
  .virtual('formatDate')
  .get(function () {
    return formatDistanceToNow(this.date, { addSuffix: true })
  })

// Export model
module.exports = mongoose.model('Post', PostSchema)
