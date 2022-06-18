import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'
import Content from './Content'
import RouterLink from '../RouterLink'
import DateFormat from './DateFormat'
import { Link } from 'react-router-dom'
const Comments = ({ postId, comments, commentsCount, showViewAll = true, showAvatar = false }) => {
  if (commentsCount === 0) return (<></>)

  const marginBottom = showAvatar ? 4 : 0

  return (
    <Box>
      {showViewAll &&
        <RouterLink weight={400} color='var(--textSecondary)' to={`/posts/${postId}`}>
          View all {commentsCount} comments
        </RouterLink>}

      {comments.map(comment => {
        return (
          <Flex key={comment._id} gap={2} marginBottom={marginBottom} alignItems='flex-start'>
            {showAvatar && <Link to={`/accounts/${comment.author.username}`}><Avatar size='xs' name={comment.author.username} src={comment.author.avatar} marginTop={1} /></Link>}
            <Box>
              <Content content={comment.content} username={comment.author.username} maxWords={15} />
              {showAvatar && <DateFormat date={comment.createdAt} />}
            </Box>
          </Flex>

        )
      })}

    </Box>

  )
}

export default Comments
