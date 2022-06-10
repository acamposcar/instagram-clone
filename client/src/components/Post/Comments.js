import React from 'react'
import { Box } from '@chakra-ui/react'
import Content from './Content'

const Comments = ({ comments }) => {
  if (comments.length === 0) return (<></>)

  return (
    <>

      <Box as='button' color='var(--textSecondary)'>
        View all {comments.length} comments
      </Box>
      {comments[0] && <Content content={comments[0].content} username={comments[0].user.username} maxWords={15} />}
      {comments[1] && <Content content={comments[1].content} username={comments[1].user.username} maxWords={15} />}
    </>

  )
}

export default Comments
