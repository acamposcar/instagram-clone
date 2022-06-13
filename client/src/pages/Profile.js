import React from 'react'
import { VStack, TabPanel, Box } from '@chakra-ui/react'
import Header from '../components/Profile/Header'
import Posts from '../components/Profile/Posts'
import TabsNav from '../components/Profile/TabsNav'
import Saved from '../components/Profile/Saved'

const posts = [
  {
    _id: 1,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1601224748193-d24f166b5c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]
  },
  {
    _id: 2,
    location: 'Ama Dablam',
    image: 'https://images.unsplash.com/photo-1632108699611-a7df2b99a388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We were restricted on our summit Push because this. We were restricted on our summit Push because this. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd' }]
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
  },
  {
    _id: 4,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]
  },
  {
    _id: 5,
    location: 'Ama Dablam',
    image: 'https://images.unsplash.com/photo-1611154045963-d9decc1fa2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.comt/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We were restricted on our summit Push because this. We were restricted on our summit Push because this. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd' }]
  },
  {
    _id: 6,
    location: '',
    image: 'https://images.unsplash.com/photo-1586399254847-02e1369bac88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFscGluaXNtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    user: { _id: 3, username: 'mplanet', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [],
    comments: []
  }
]

const saved = [
  {
    _id: 1,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]
  },
  {
    _id: 2,
    location: 'Ama Dablam',
    image: 'https://images.unsplash.com/photo-1614686454913-1e93f6f8ea1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We were restricted on our summit Push because this. We were restricted on our summit Push because this. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd' }]
  },
  {
    _id: 3,
    location: '',
    image: 'https://images.unsplash.com/photo-1555377707-cf83d17f50fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 3, username: 'mplanet', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [],
    comments: []
  },
  {
    _id: 4,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1604290516523-24f9727fac6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]
  },
  {
    _id: 5,
    location: 'Ama Dablam',
    image: 'https://images.unsplash.com/photo-1498576260462-eefc9d0ce9f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.comt/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We were restricted on our summit Push because this. We were restricted on our summit Push because this. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }, { _id: 2, user: { _id: 2, username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, content: 'We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd. We successfully summited at 4:30am from camp 3 on the 22nd' }]
  },
  {
    _id: 6,
    location: '',
    image: 'https://images.unsplash.com/photo-1611154046036-cd91e50978be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YWxwaW5pc218ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60',
    user: { _id: 3, username: 'mplanet', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'LHOTSE SUMMIT💪🏽📍 8000er #6 🤜🏽 This was a tough one. We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window. so we were forecasted 20 km/h winds on the summit which is not too bad in spring however as soon as we left camp we realised that it was a bit more than 20 km/h!! We successfully summited at 4:30am from camp 3 on the 22nd 🔥Thank you @gelje_sherpa_ for being my amazing climbing partner once again even though you had a flu 😂🤦🏽‍♀️ and thank you @sevensummittreks for the infrastructure 🤪',
    date: new Date(),
    likes: [],
    comments: []
  }
]

const Profile = () => {
  return (
    <Box fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Header postsCount={posts.length} />
      <TabsNav>
        <TabPanel>
          <Posts posts={posts} />
        </TabPanel>
        <TabPanel>
          <Posts posts={saved} />
        </TabPanel>
      </TabsNav>
    </Box>
  )
}

export default Profile