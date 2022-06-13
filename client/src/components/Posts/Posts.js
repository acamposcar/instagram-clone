import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import Header from './Header'
import Social from './Social'
import Liked from './Liked'
import Content from './Content'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Card from '../Card'
import DateFormat from './DateFormat'
import RouterLink from '../RouterLink'
const Posts = ({ posts }) => {
  return (
    <>
      {
        posts.map(post => {
          return (
            <Card width='100%' key={post._id}>
              <Header user={post.user} location={post.location} />
              <Box>
                <RouterLink to={`/posts/${post._id}`}>
                  <Image maxHeight='500px' width='100%' objectFit='cover' objectPosition='center' src={post.image} alt='' />
                </RouterLink>
              </Box>
              <Social />
              <Box px={5} my={3}>
                <Liked likes={post.likes} />
                <Content username={post.user.username} content={post.content} maxWords={30} />
                <Comments postId={post._id} comments={post.comments.slice(0, 2)} />
                <DateFormat date={post.date} />
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
