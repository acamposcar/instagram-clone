import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import Header from './Header'
import Social from './Social'
import Liked from './Liked'
import Content from './Content'
import Comments from './Comments'
import { formatDistanceToNow } from 'date-fns'
import CommentForm from './CommentForm'
import Card from '../Card'

const Posts = ({ posts }) => {
  const formatDate = (date) => formatDistanceToNow(new Date(date), { addSuffix: true })

  return (
    <>
      {
        posts.map(post => {
          return (
            <Card key={post._id}>
              <Header user={post.user} location={post.location} />
              <Box>
                <Image maxHeight='500px' width='100%' objectFit='cover' objectPosition='center' src={post.image} alt='' />
              </Box>
              <Social />
              <Box px={5} my={3}>
                <Liked likes={post.likes} />
                <Content username={post.user.username} content={post.content} maxWords={30} />
                <Comments comments={post.comments} />
                <Text my={3} fontSize={10} color='var(--textSecondary)'>{formatDate(post.date).toUpperCase()}</Text>
              </Box>
              <hr />
              <CommentForm />
            </Card>
          )
        })
      }
    </>
  )
}

export default Posts
