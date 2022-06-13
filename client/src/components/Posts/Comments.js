import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'
import Content from './Content'

const Comments = ({ comments, showViewAll = true, showAvatar = false }) => {
  if (comments.length === 0) return (<></>)

  const marginBottom = showAvatar ? 4 : 0

  return (
    <Box>
      {showViewAll &&
        <Box as='button' color='var(--textSecondary)'>
          View all {comments.length} comments
        </Box>}

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
