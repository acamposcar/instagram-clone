import React from 'react'
import { Grid } from '@chakra-ui/react'
import BoxImage from './BoxImage'

const Posts = ({ posts }) => {
  return (
    <Grid alignContent='center' gridTemplateColumns='1fr 1fr 1fr' gap={{ base: '3px', md: '28px' }}>
      {
        posts.map(post => {
          return (
            <BoxImage key={post._id} postId={post._id} image={post.image} commentsCount={post.comments.length} likesCount={post.likes.length} />
          )
        })
      }
    </Grid>
  )
}

export default Posts
