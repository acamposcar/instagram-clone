
import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const CountMobile = ({ postsCount, followersCount, followingCount }) => {
  return (

    <Flex my='20px' padding={2} justifyContent='space-around' gap={3} width='100%' textAlign='center' borderTop='1px solid var(--borderColor)' borderBottom='1px solid var(--borderColor)'>
      <Box>
        <Box as='span' fontWeight='bold'>{postsCount}</Box>
        <Box color='var(--textSecondary)'>posts</Box>
      </Box>
      <Box>
        <Box as='span' fontWeight='bold'>{followersCount}</Box>
        <Box color='var(--textSecondary)'>followers</Box>
      </Box>
      <Box>
        <Box as='span' fontWeight='bold'>{followingCount}</Box>
        <Box color='var(--textSecondary)'>following</Box>
      </Box>
    </Flex>

  )
}

export default CountMobile
