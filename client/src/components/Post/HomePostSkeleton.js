import React from 'react'
import { Box, SkeletonCircle, Skeleton, SkeletonText, Flex } from '@chakra-ui/react'
import CommentForm from './Common/CommentForm'
import Card from '../Card'

const HomePostSkeleton = () => {
  return (
    <Card>
      <Flex p={3} gap={3}>
        <SkeletonCircle size='10' />
      </Flex>
      <Box>
        <Skeleton height='300px' />
      </Box>
      <Box px={5} my={3}>
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
      <hr />
      <CommentForm />
    </Card>
  )
}

export default HomePostSkeleton
