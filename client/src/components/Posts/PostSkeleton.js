import React from 'react'
import { Box, SkeletonCircle, Skeleton, SkeletonText, VStack, Flex } from '@chakra-ui/react'
import Social from './Social'
import CommentForm from './CommentForm'
import Card from '../Card'

const PostSkeleton = ({ posts }) => {
  return (
    <VStack fontSize='sm' my={8} gap={8} as='main' justifyContent='center' maxWidth='550px' mx='auto' px={1}>

      <Card width='100%'>
        <Flex p={3} gap={3}>
          <SkeletonCircle size='10' />
        </Flex>
        <Box>
          <Skeleton height='300px' />
        </Box>
        <Social />
        <Box px={5} my={3}>
          <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
        <hr />
        <CommentForm />
      </Card>
    </VStack>
  )
}

export default PostSkeleton
