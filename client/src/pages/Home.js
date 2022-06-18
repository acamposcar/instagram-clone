import React, { useEffect } from 'react'
import { VStack, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Post from '../components/Post/Post'
import AlertError from '../components/AlertError'
import PostSkeleton from '../components/Post/PostSkeleton'
import useHttp from '../hooks/useHttp'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
const Home = () => {
  const { sendRequest, loading, data: posts, error } = useHttp(getPosts, true)

  const authCtx = useAuth()

  useEffect(() => {
    sendRequest(authCtx.token)
  }, [sendRequest, authCtx.token])

  if (loading || !authCtx.user) return <PostSkeleton />

  if (error) {
    return (
      <AlertError error={error} />
    )
  }

  if (posts.length === 0) {
    return (
      <Alert marginY={6} status='warning' variant='left-accent'>
        <AlertIcon />
        <AlertTitle>No posts found</AlertTitle>
      </Alert>
    )
  }

  return (

    <VStack fontSize='sm' marginTop={8} marginBottom='100px' gap={8} as='main' justifyContent='center' maxWidth='550px' mx='auto' px={1}>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </VStack>

  )
}

export default Home
