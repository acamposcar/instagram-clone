const mongoose = require('mongoose')

const { Schema } = mongoose

const SavedSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true }
)

SavedSchema.index({ post: 1, user: 1 }, { unique: true })

// Export model
module.exports = mongoose.model('Saved', SavedSchema)
