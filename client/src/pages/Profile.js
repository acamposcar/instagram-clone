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
  const { sendRequest, loading, data, success, error } = useHttp(getUserPosts, true)
  const authCtx = useAuth()

  // State to be able to update avatar without reloading page
  const [user, setUser] = useState()

  const posts = data?.posts
  const saved = data?.saved
  const followers = data?.followers
  const following = data?.following

  useEffect(() => {
    sendRequest({ token: authCtx.token, username })
  }, [sendRequest, username, authCtx.token])

  useEffect(() => {
    if (success) {
      setUser(data.user)
    }
  }, [data, success])

  if (error) {
    return (
      <AlertError error={error} />
    )
  }

  if (loading || user === undefined) return <PostSkeleton />

  const updateAvatar = (filename) => {
    setUser(prevState => {
      return { ...prevState, avatar: `/uploads/avatar/${filename}` }
    })
  }

  return (
    <Box fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Header postsCount={posts.length} user={user} initialFollowers={followers} following={following} updateAvatar={updateAvatar} />
      <TabsNav>
        <TabPanel>
          <GridPosts posts={posts} />
        </TabPanel>
        <TabPanel>
          <GridPosts posts={saved} />
        </TabPanel>
      </TabsNav>
    </Box>
  )
}

export default Profile
