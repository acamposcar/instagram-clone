/** @jsxImportSource @emotion/react */

import React from 'react'
import { Flex } from '@chakra-ui/react'
import { ReactComponent as CommentIcon } from '../../../assets/icons/comment.svg'
import LikedBy from './LikedBy'
import ToggleLike from './ToggleLike'
import { Link } from 'react-router-dom'
import Share from './Share'
import ToggleSave from './ToggleSave'
const Social = ({ postId, likes, saved, renderedFromHome }) => {
  return (

    <>
      <Flex p={3} justifyContent='space-between' alignItems='center'>
        <Flex gap={3} alignItems='center'>
          <ToggleLike postId={postId} likes={likes} renderedFromHome={renderedFromHome} />
          <Link to={`/posts/${postId}`}>
            <CommentIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
          </Link>
          <Share postId={postId} />
        </Flex>
        <ToggleSave savedPosts={saved} postId={postId} renderedFromHome={renderedFromHome} />
      </Flex>

      <LikedBy likes={likes} />
    </>
  )
}

export default Social
