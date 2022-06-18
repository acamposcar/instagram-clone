/** @jsxImportSource @emotion/react */

import React, { useState, useCallback } from 'react'
import { Flex } from '@chakra-ui/react'
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg'
import LikedBy from './LikedBy'
import LikePost from './LikePost'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import Share from './Share'
import SavePost from './SavePost'
const Social = ({ postId, likes, saved }) => {
  const [likesState, setLikesState] = useState(likes)

  const authCtx = useAuth()

  const [isLiked, setIsLiked] = useState(!!likes.find(like => like.user.username === authCtx.user.username))

  const handleLike = useCallback(() => {
    // Add auth user to likes list
    setLikesState(prevState => {
      return [...prevState, { user: authCtx.user }]
    })
    setIsLiked(true)
  }, [authCtx.user])

  const handleUnlike = useCallback(() => {
    // Remove auth user from likes list
    setLikesState(prevState => {
      return prevState.filter(like => like.user.username !== authCtx.user.username)
    })
    setIsLiked(false)
  }, [authCtx.user])

  return (
    <>
      <Flex p={3} justifyContent='space-between' alignItems='center'>
        <Flex gap={3} alignItems='center'>
          {isLiked && <LikePost onLike={handleUnlike} onError={handleLike} isLiked postId={postId} likes={likesState} />}
          {!isLiked && <LikePost onLike={handleLike} onError={handleUnlike} isLiked={false} postId={postId} likes={likesState} />}
          <Link to={`/posts/${postId}`}>
            <CommentIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
          </Link>

          <Share postId={postId} />

        </Flex>
        <SavePost savedPosts={saved} postId={postId} />

      </Flex>
      <LikedBy likes={likesState} />

    </>
  )
}

export default Social
