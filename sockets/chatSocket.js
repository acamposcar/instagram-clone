const socketIO = require('socket.io')
const io = socketIO()
const socketApi = {}

socketApi.io = io

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId
  socket.join(userId)

  socket.on('join-room', (recipientId) => {
    socket.join(recipientId)
  })

  socket.on('send-message', (recipientId, conversationId) => {
    io.to(recipientId).emit('invalidate-query', conversationId)
  })
})

module.exports = socketApi
