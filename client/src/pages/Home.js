import React from 'react'
import { VStack, Container } from '@chakra-ui/react'
import HomePost from '../components/Post/HomePost'
import CustomAlert from '../components/CustomAlert'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
import { useQuery } from 'react-query'
import CustomSpinner from '../components/CustomSpinner'

const Home = () => {
  const authCtx = useAuth()

  const { isError, data: posts, error } = useQuery('homePosts', () => getPosts(authCtx.token))

  if (posts && posts.length > 0) {
    return (
      <Container maxWidth='550px' p={0}>
        <VStack gap={8}>
          {posts.map(post => <HomePost key={post._id} post={post} />)}
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
    <CustomSpinner />

  )
}

export default Home
