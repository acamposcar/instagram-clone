import React, { useState, useEffect, useCallback } from 'react'

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  user: {},
  isLoggedIn: false,
  login: (token, expirationTime, user) => { },
  logout: () => { }
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    // Treshold. If remaining time is less than 1 minute, remove token
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime
  }
}

export const AuthContextProvider = (props) => {
  const storedData = retrieveStoredToken()

  const [token, setToken] = useState(storedData?.token)
  const [user, setUser] = useState()

  const isLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime, user) => {
    const transformedUser = {
      ...user,
      avatar: `/uploads/avatar/${user.avatar}`
    }
    setToken(token)
    setUser(transformedUser)
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  const validateToken = useCallback(async () => {
    const response = await fetch('/api/v1/users/validate', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Invalid token')
    }

    setUser({
      ...data,
      avatar: `/uploads/avatar/${data.avatar}`
    })
  }, [token])

  useEffect(() => {
    if (storedData) {
      logoutTimer = setTimeout(logoutHandler, storedData.duration)
    }
  }, [storedData, logoutHandler])

  useEffect(() => {
    if (token) {
      validateToken(token).catch(() => {
        logoutHandler()
      })
    }
  }, [token, validateToken, logoutHandler])

  const contextValue = {
    token,
    user,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
