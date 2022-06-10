/** @jsxImportSource @emotion/react */
import React from 'react'
import { Avatar, VStack, HStack, Box, Text } from '@chakra-ui/react'
import Card from '../components/Card'
import Post from '../components/Post/Post'
const posts = [
  {
    _id: 1,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1601224748193-d24f166b5c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    user: { _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]
  },
  {
    _id: 2,
    location: 'Ama Dablam',
    image: 'https://images.unsplash.com/photo-1632108699611-a7df2b99a388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://bit.ly/dan-abramov', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We were restricted on our summit Push because this. We were restricted on our summit Push because this. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd' }]
  },
  {
    _id: 3,
    location: '',
    image: 'https://images.unsplash.com/photo-1629085932235-e4bcdc7d6e7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    user: { _id: 3, username: 'mplanet', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [],
    comments: []
  }
]

const Home = () => {
  return (
    <VStack fontSize='sm' my={8} gap={3} as='main' justifyContent='center'>
      <Card>
        <HStack mt={1} p={4} gap={2} overflow='hidden'>
          {posts.map(post => {
            return (
              <Box key={post._id} textAlign='center'>
                <Box position='relative'>
                  {/* <InstagramRingIcon css={{ position: 'absolute', top: '-3.5px', left: '-3.5px', width: '62px', height: '62px' }} /> */}
                  <Avatar position='absolute' top='-4px' left='-4px' width='65px' height='65px' name={post.user.username} backgroundColor='white' src='https://702pros.com/wp-content/uploads/2021/01/Instagram-Ring.png' />
                  <Avatar width='57px' height='57px' name={post.user.username} src={post.user.avatar} />
                </Box>
                <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 9)}</Text>
              </Box>
            )
          })}
          {posts.map(post => {
            return (
              <Box key={post._id} textAlign='center'>
                <Avatar width='55px' height='55px' name={post.user.username} src={post.user.avatar} />
                <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 11)}</Text>
              </Box>
            )
          })}
          {posts.map(post => {
            return (
              <Box key={post._id} textAlign='center'>
                <Avatar width='55px' height='55px' name={post.user.username} src={post.user.avatar} />
                <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 11)}</Text>
              </Box>
            )
          })}
        </HStack>
      </Card>
      {posts.map(post => {
        return (
          <Card key={post._id}>
            <Post post={post} />
          </Card>
        )
      })}
    </VStack>
  )
}

export default Home
