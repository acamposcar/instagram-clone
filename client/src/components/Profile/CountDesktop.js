
import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

const CountDesktop = ({ postsCount, followersCount, followingCount }) => {
  return (

    <Flex my={5} justifyContent='space-between' gap={7}>
      <Text><Box as='span' fontWeight='bold'>{postsCount}</Box> posts</Text>
      <Text><Box as='span' fontWeight='bold'>{followersCount}</Box> followers</Text>
      <Text><Box as='span' fontWeight='bold'>{followingCount}</Box> following</Text>
    </Flex>

  )
}

export default CountDesktop
