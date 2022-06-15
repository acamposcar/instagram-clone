const mongoose = require('mongoose')

const { Schema } = mongoose

const LikeSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true }
)

// Export model
module.exports = mongoose.model('Like', LikeSchema)
