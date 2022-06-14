const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, minlength: 3, maxlength: 20, match: /^[A-Za-z0-9_]+$/, unique: true },
    hash: { type: String, required: true, minlength: 6, select: false },
    salt: { type: String, required: true, select: false },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'], required: true },
    bio: { type: String },
    avatar: { type: String }
  }, { timestamps: true }
)

// Export model
module.exports = mongoose.model('User', UserSchema)
