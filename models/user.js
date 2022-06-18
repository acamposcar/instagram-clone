const mongoose = require('mongoose')
const Saved = require('./saved')
const Like = require('./like')
const Comment = require('./comment')
const Following = require('./following')
const Post = require('./post')
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

UserSchema.pre('findOneAndRemove', function (next) {
  const id = this.getQuery()._id
  Following.deleteMany({ user: id }, next)
  Following.deleteMany({ following: id }, next)
  Comment.deleteMany({ author: id }, next)
  Post.deleteMany({ author: id }, next)
  Like.deleteMany({ user: id }, next)
  Saved.deleteMany({ user: id }, next)
})

// Export model
module.exports = mongoose.model('User', UserSchema)
