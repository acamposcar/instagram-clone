import React from 'react'
import { VStack, Container } from '@chakra-ui/react'
import Post from '../components/Post/Post'
import CustomAlert from '../components/CustomAlert'
import PostSkeleton from '../components/Post/PostSkeleton'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
import { useQuery } from 'react-query'

const Home = () => {
  const authCtx = useAuth()

  const { isError, data: posts, error } = useQuery('homePosts', () => getPosts(authCtx.token))

  if (posts && posts.length > 0) {
    return (
      <Container maxWidth='550px'>
        <VStack gap={8}>
          {posts.map(post => <Post key={post._id} post={post} />)}
        </VStack>
      </Container>
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
    <Container gap={8} maxWidth='550px'>
      <PostSkeleton />
    </Container>
  )
}

export default Home
