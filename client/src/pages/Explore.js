import React from 'react'
import { Container, Box } from '@chakra-ui/react'
import GridPosts from '../components/GridPosts/GridPosts'
import PostSkeleton from '../components/Post/PostSkeleton'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
import CustomAlert from '../components/CustomAlert'
import { useQuery } from 'react-query'

const Explore = () => {
  const authCtx = useAuth()

  const { isError, data: posts, error } = useQuery('explorePosts', () => getPosts(authCtx.token))

  if (posts && posts.length > 0) {
    return (
      <Box width='100%'>
        <GridPosts alternateSpan posts={posts} />
      </Box>
    )
  }

  if (posts && posts.length === 0) {
    return <CustomAlert status='warning' title='No post found' message='No post found in the server' />
  }

  if (isError) {
    return <CustomAlert status='error' title='Fetch error!' message={error.message} />
  }

  return (
    // Loading
    <Container gap={8}>
      <PostSkeleton />
    </Container>
  )
}

export default Explore
