const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 3, maxlength: 20, match: /^[A-Za-z0-9_]+$/, unique: true },
    hash: { type: String, required: true, minlength: 6, select: false },
    salt: { type: String, required: true, select: false },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'], required: true },
    bio: { type: String },
    avatar: { type: String }
  }, { timestamps: true }
)

UserSchema
  .virtual('toJSON')
  .get(function () {
    return {
      _id: this._id,
      username: this.username,
      name: this.name,
      bio: this.bio,
      avatar: this.avatar,
      roles: this.roles,
      saved: this.saved
    }
  })

UserSchema.pre('deleteMany', function (next) {
  this.model('Following').deleteMany({ user: this._id })
  this.model('Following').deleteMany({ following: this._id })
  this.model('Comments').deleteMany({ author: this._id })
  this.model('Post').deleteMany({ author: this._id })
  this.model('Like').deleteMany({ likedBy: this._id })
  this.model('Saved').deleteMany({ user: this._id })
  next()
})

// Export model
module.exports = mongoose.model('User', UserSchema)
