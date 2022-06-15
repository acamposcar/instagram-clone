
exports.test = (req, res, next) => {
  return res.status(200).json({ hello: 'world' })
}
