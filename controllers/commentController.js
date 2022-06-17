const Comment = require('../models/comment')
const Post = require('../models/post')
const validationMiddleware = require('../middleware/validation')

// @desc    Add comment
// @route   POST /api/v1/posts/:postId/comments/
// @access  Private
exports.addComment = [
  validationMiddleware.comment(),
  validationMiddleware.validationResult,

  async (req, res, next) => {
    try {
      console.log(req.body.content)
      const comment = await new Comment({
        content: req.body.content,
        author: req.user._id
      }).populate('author')
      comment.save()
      // Add comment to post
      console.log(comment)
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

// @desc    Delete one comment
// @route   DELETE /api/v1/posts/:postId/comments/:commentId
// @access  Public
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.commentId)
    if (!comment) {
      return res.status(404).json({
        error: 'No comment found'
      })
    }
    return res.status(200).json({
      data: {}
    })
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid comment ID'
      })
    }
    return next(err)
  }
}
