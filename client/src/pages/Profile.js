import React, { useEffect, useState } from 'react'
import { TabPanel, Box } from '@chakra-ui/react'
import Header from '../components/Profile/Header'
import GridPosts from '../components/GridPosts/GridPosts'
import TabsNav from '../components/Profile/TabsNav'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/useHttp'
import useAuth from '../hooks/useAuth'
import { getUserPosts } from '../lib/api'
import PostSkeleton from '../components/Post/PostSkeleton'
import AlertError from '../components/AlertError'

const Profile = () => {
  const { username } = useParams()
  const { sendRequest, loading, data, success, error } = useHttp(getUserPosts, true)
  const authCtx = useAuth()

  useEffect(() => {
    sendRequest({ token: authCtx.token, username })
  }, [sendRequest, username, authCtx.token])

  if (error) {
    return (
      <AlertError error={error} />
    )
  }

  if (loading || !authCtx.user) return <PostSkeleton />

  const user = data.user
  const posts = data.posts
  const saved = data.saved
  const followers = data.followers
  const following = data.following

  return (
    <Box fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Header postsCount={posts.length} user={user} initialFollowers={followers} following={following} />
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
