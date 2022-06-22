import React from 'react'
import { Box, HStack, Text, Avatar } from '@chakra-ui/react'
import Card from './Card'

const Stories = ({ stories }) => {
  return (
    <Card width='100%'>
      <HStack mt={1} p={4} gap={2} overflow='hidden'>
        {stories.map(post => {
          return (
            <Box key={post._id} textAlign='center'>
              <Box position='relative'>
                <Avatar position='absolute' top='-4px' left='-4px' width='65px' height='65px' src='https://702pros.com/wp-content/uploads/2021/01/Instagram-Ring.png' />
                <Avatar boxSize='57px' src={post.author.avatar} />
              </Box>
              <Text mt={1} fontSize={12} color='textSecondary'>{post.author.username.slice(0, 9)}</Text>
            </Box>
          )
        })}
      </HStack>
    </Card>
  )
}

export default Stories
