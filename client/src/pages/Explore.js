import React from 'react'
import { Box } from '@chakra-ui/react'
import GridPosts from '../components/GridPosts/GridPosts'
import useAuth from '../hooks/useAuth'
import { getPosts } from '../lib/api'
import CustomAlert from '../components/CustomAlert'
import { useQuery } from 'react-query'
import CustomSpinner from '../components/CustomSpinner'
const Explore = () => {
  const authCtx = useAuth()

  const { isError, data: posts, error } = useQuery('explorePosts', () => getPosts({ token: authCtx.token, allPosts: true }))

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
    <CustomSpinner />

  )
}

export default Explore
