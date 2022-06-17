const mongoose = require('mongoose')

const { Schema } = mongoose

const FollowingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    following: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true }
)

FollowingSchema.index({ user: 1, following: 1 }, { unique: true })

// Export model
module.exports = mongoose.model('Following', FollowingSchema)
