import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket () {
  return useContext(SocketContext)
}

export function SocketProvider ({ userId, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      '/',
      { query: { userId } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [userId])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
