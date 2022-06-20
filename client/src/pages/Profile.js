import React from 'react'
import { TabPanel } from '@chakra-ui/react'
import Header from '../components/Profile/Header'
import GridPosts from '../components/GridPosts/GridPosts'
import TabsNav from '../components/Profile/TabsNav'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getUserPosts } from '../lib/api'
import { useQuery } from 'react-query'
import CustomAlert from '../components/CustomAlert'
import CustomSpinner from '../components/CustomSpinner'
const Profile = () => {
  const authCtx = useAuth()
  const { username } = useParams()

  const { isError, data, error } = useQuery(['profile', username], () => getUserPosts({ token: authCtx.token, username }))

  if (data) {
    return (
      <>
        <Header postsCount={data.posts.length} user={data.user} followers={data.followers} following={data.following} />
        <TabsNav>
          <TabPanel p={0} my={{ md: 5, base: 1 }}>
            <GridPosts posts={data.posts} />
          </TabPanel>
          <TabPanel p={0} my={{ md: 5, base: 1 }}>
            <GridPosts posts={data.saved} />
          </TabPanel>
        </TabsNav>
      </>
    )
  }

  if (isError) {
    return <CustomAlert status='error' title='Fetch error!' message={error.message} />
  }

  return (
    // Loading
    <CustomSpinner />

  )
}

export default Profile
