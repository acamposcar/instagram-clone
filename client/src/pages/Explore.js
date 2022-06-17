import React, { useEffect } from 'react'
import { Box, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import GridPosts from '../components/GridPosts/GridPosts'
import PostSkeleton from '../components/Posts/PostSkeleton'
import useHttp from '../hooks/useHttp'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
import AlertError from '../components/AlertError'

const Explore = () => {
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
    <Box fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      {/* Sort posts randomly */}
      <GridPosts alternateSpan posts={posts} />
    </Box>
  )
}

export default Explore
