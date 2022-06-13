import React from 'react'
import { VStack } from '@chakra-ui/react'
import Posts from '../components/Posts/Posts'
import Stories from '../components/Stories'

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
    <VStack fontSize='sm' my={8} gap={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Stories stories={posts} />
      <Posts posts={posts} />
    </VStack>
  )
}

export default Home
