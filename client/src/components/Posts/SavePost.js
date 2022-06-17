/** @jsxImportSource @emotion/react */

import React, { useEffect, useCallback, useState } from 'react'
import { Button } from '@chakra-ui/react'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleSavePost } from '../../lib/api'
import { ReactComponent as SaveOutlineIcon } from '../../assets/icons/saveOutline.svg'
import { ReactComponent as SaveFillIcon } from '../../assets/icons/saveFill.svg'

const SavePost = ({ postId, savedPosts }) => {
  const authCtx = useAuth()

  const { sendRequest, loading, error, data, success } = useHttp(toggleSavePost, false)
  const [isSaved, setIsSaved] = useState(!!savedPosts.find(savedPost => savedPost.user.username === authCtx.user.username))

  const handleClick = useCallback(() => {
    sendRequest({ token: authCtx.token, postId })
  }, [sendRequest, postId, authCtx.token])

  useEffect(() => {
    if (success && data.msg) {
      if (data.msg === 'Created') setIsSaved(true)
      if (data.msg === 'Deleted') setIsSaved(false)
    }
  }, [success, data?.msg])

  useEffect(() => {
    toast.error(error)
  }, [error])

  return (
    <>
      {isSaved &&
        <Button height='auto' minW={0} p={0} size='sm' as='button' variant='ghost' isLoading={loading} onClick={handleClick} _hover={{ fill: '#8e8e8e' }} _active={{}}>
          <SaveFillIcon css={{ fill: 'inherit' }} />
        </Button>}
      {!isSaved &&
        <Button height='auto' minW={0} p={0} as='button' size='sm' variant='ghost' isLoading={loading} onClick={handleClick} color='black' _hover={{ color: '#8e8e8e' }} _active={{}}>
          <SaveOutlineIcon css={{ color: 'inherit' }} />
        </Button>}
    </>
  )
}

export default SavePost
