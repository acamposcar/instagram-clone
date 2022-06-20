const Comment = require('../models/comment')
const Post = require('../models/post')
const validationMiddleware = require('../middleware/validation')

// @desc    Add comment
// @route   POST /api/v1/posts/:postId/comments/
// @access  Users
exports.addComment = [
  validationMiddleware.comment(),
  validationMiddleware.validationResult,

  async (req, res, next) => {
    try {
      const comment = await new Comment({
        content: req.body.content,
        author: req.user._id
      }).populate('author')
      comment.save()
      // Add comment to post
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: comment } }, { new: true })

      if (!updatedPost) {
        return res.status(404).json({
          error: 'No post found'
        })
      }

      return res.status(200).json(comment)
    } catch (err) {
      return next(err)
    }
  }

]
