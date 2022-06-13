import {
  Flex,
  Image,
  Avatar,
  Box,
  HStack
} from '@chakra-ui/react'
import { useState } from 'react'
import Card from '../components/Card'
import Social from '../components/Posts/Social'
import Liked from '../components/Posts/Liked'
import DateFormat from '../components/Posts/DateFormat'
import Comments from '../components/Posts/Comments'
import CommentForm from '../components/Posts/CommentForm'
import Header from '../components/Posts/Header'
const PostDetail = () => {
  const [post, setPost] = useState({
    _id: 1,
    location: "Rock'n'roll",
    image: 'https://images.unsplash.com/photo-1632108699611-a7df2b99a388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' },
    content: 'Wake up, legs! ⏰ It’s mountain season!',
    date: new Date(),
    likes: [{ username: 'courtneydauwalter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Courtney Dauwalter' }, { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }],
    comments: [{ _id: 1, user: { _id: 1, username: 'acampos', avatar: 'https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', name: 'Alejandro Campos' }, content: 'This was a tough one' }, { _id: 2, user: { _id: 1, username: 'etroguet', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', name: 'Alejandro Campos' }, content: 'We were restricted on our summit Push because of our need to go to Makalu base camp within the summit window' }]

  })
  return (
    <Flex fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Card width='auto'>
        <Flex>
          <Image borderRadius='8px 0px 0px 8px' maxWidth='550px' minHeight='600px' objectFit='cover' backgroundColor='black' objectPosition='center' src={post.image} alt='' />
          <Flex flexDirection='column' maxWidth='385px' px={5} justifyContent='space-between'>
            <Box flex={1}>
              <Header user={post.user} location={post.location} avatarSize='lg' />
              {/* CSS to hide scrollbar */}
              <Box overflow='auto' css={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } }} maxHeight='350px'>
                <Box marginBottom={5} p={3}> {post.content}</Box>
                <Comments comments={post.comments} showViewAll={false} showAvatar />
              </Box>
            </Box>
            <Box>
              <Social />
              <Liked likes={post.likes} />
              <DateFormat date={post.date} />
              <hr />
              <CommentForm />
            </Box>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default PostDetail
