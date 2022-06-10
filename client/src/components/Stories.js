import React from 'react'
import { Box, HStack, Text, Avatar } from '@chakra-ui/react'
import Card from './Card'

const Stories = ({ stories }) => {
  return (
    <Card>
      <HStack mt={1} p={4} gap={2} overflow='hidden'>
        {stories.map(post => {
          return (
            <Box key={post._id} textAlign='center'>
              <Box position='relative'>
                <Avatar position='absolute' top='-4px' left='-4px' width='65px' height='65px' name={post.user.username} backgroundColor='white' src='https://702pros.com/wp-content/uploads/2021/01/Instagram-Ring.png' />
                <Avatar width='57px' height='57px' name={post.user.username} src={post.user.avatar} />
              </Box>
              <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 9)}</Text>
            </Box>
          )
        })}
        {stories.map(post => {
          return (
            <Box key={post._id} textAlign='center'>
              <Avatar width='55px' height='55px' name={post.user.username} src={post.user.avatar} />
              <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 11)}</Text>
            </Box>
          )
        })}
        {stories.map(post => {
          return (
            <Box key={post._id} textAlign='center'>
              <Avatar width='55px' height='55px' name={post.user.username} src={post.user.avatar} />
              <Text mt={1} fontSize={12} color='var(--textSecondary)'>{post.user.username.slice(0, 11)}</Text>
            </Box>
          )
        })}
      </HStack>
    </Card>
  )
}

export default Stories
