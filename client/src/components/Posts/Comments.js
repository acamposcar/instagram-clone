import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'
import Content from './Content'
import RouterLink from '../RouterLink'
const Comments = ({ postId, comments, showViewAll = true, showAvatar = false }) => {
  if (comments.length === 0) return (<></>)

  const marginBottom = showAvatar ? 4 : 0

  return (
    <Box>
      {showViewAll &&
        <RouterLink weight={400} color='var(--textSecondary)' to={`/posts/${postId}`}>
          View all {comments.length} comments
        </RouterLink>}

      {comments.map(comment => {
        return (
          <Flex key={comment._id} gap={2} marginBottom={marginBottom} alignItems='flex-start'>
            {showAvatar && <Avatar size='xs' name={comment.user.username} src={comment.user.avatar} />}
            <Content content={comment.content} username={comment.user.username} maxWords={15} />
          </Flex>
        )
      })}

    </Box>

  )
}

export default Comments
