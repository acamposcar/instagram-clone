
import React, { useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { followUnfollow } from '../../lib/api'

const Follow = ({ username, onFollow, text, color }) => {
  const { sendRequest, loading, error, success } = useHttp(followUnfollow, false)

  const authCtx = useAuth()

  const handleClick = () => {
    sendRequest({ token: authCtx.token, username })
  }

  useEffect(() => {
    if (success) {
      onFollow()
    }
  }, [success, onFollow])

  useEffect(() => {
    toast.error(error)
  }, [error])

  return (
    <>
      <Button onClick={handleClick} isLoading={loading} size='sm' colorScheme={color}>{text}</Button>
    </>
  )
}

export default Follow
