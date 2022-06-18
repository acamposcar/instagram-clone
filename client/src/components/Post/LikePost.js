/** @jsxImportSource @emotion/react */

import React, { useEffect, useCallback } from 'react'
import { Button } from '@chakra-ui/react'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleLikePost } from '../../lib/api'
import { ReactComponent as HeartFillIcon } from '../../assets/icons/heartFill.svg'
import { ReactComponent as HeartOutlineIcon } from '../../assets/icons/heartOutline.svg'

const LikePost = ({ postId, onLike, isLiked }) => {
  const { sendRequest, loading, error, success } = useHttp(toggleLikePost, false)

  const authCtx = useAuth()

  const handleClick = useCallback(() => {
    sendRequest({ token: authCtx.token, postId })
  }, [sendRequest, postId, authCtx.token])

  useEffect(() => {
    if (success) {
      onLike()
    }
  }, [success, onLike])

  useEffect(() => {
    toast.error(error)
  }, [error])

  return (
    <>
      {isLiked &&
        <Button height='auto' minW={0} p={0} size='sm' as='button' variant='ghost' isLoading={loading} onClick={handleClick} fill='red' _hover={{ fill: 'red.300' }} _active={{}}>
          <HeartFillIcon css={{ fill: 'inherit' }} />
        </Button>}
      {!isLiked &&
        <Button height='auto' minW={0} p={0} as='button' size='sm' variant='ghost' isLoading={loading} onClick={handleClick} _hover={{ fill: 'red' }} _active={{}}>
          <HeartOutlineIcon css={{ fill: 'inherit' }} />
        </Button>}
    </>
  )
}

export default LikePost
