import React, { useEffect, useState } from 'react'
import { TabPanel, Box, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Header from '../components/Profile/Header'
import GridPosts from '../components/GridPosts/GridPosts'
import TabsNav from '../components/Profile/TabsNav'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/useHttp'
import useAuth from '../hooks/useAuth'
import { getUserPosts } from '../lib/api'
import PostSkeleton from '../components/Posts/PostSkeleton'
import AlertError from '../components/AlertError'

const Profile = () => {
  const { username } = useParams()
  const { sendRequest, loading, data, error } = useHttp(getUserPosts, true)
  const authCtx = useAuth()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    sendRequest({ token: authCtx.token, username })
  }, [sendRequest, username, authCtx.token])

  useEffect(() => {
    if (data && !loading && !error) {
      setPosts(data.posts)
      setUser(data.user)
    }
  }, [data, loading, error])

  if (loading) return <PostSkeleton />

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

  const updateAvatar = (filename) => {
    setUser(prevState => {
      return { ...prevState, avatar: `/uploads/avatar/${filename}` }
    })
  }

  return (
    <Box fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Header postsCount={posts.length} user={user} updateAvatar={updateAvatar} />
      <TabsNav>
        <TabPanel>
          <GridPosts posts={posts} />
        </TabPanel>
        <TabPanel>
          <GridPosts posts={posts} />
        </TabPanel>
      </TabsNav>
    </Box>
  )
}

export default Profile
