import React from 'react'
import { Flex, Box, Image, Text, Skeleton } from '@chakra-ui/react'
import Card from '../Card'
import Social from '../Post/Common/Social'
import DateFormat from '../Post/Common/DateFormat'
import Comments from '../Post/Common/Comments'
import CommentForm from '../Post/Common/CommentForm'
import DetailPostHeader from '../Post/DetailPostHeader'

const DetailPost = ({ post }) => {
  return (
    <Flex justifyContent='center'>
      <Card width='auto'>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box maxWidth='550px'>
            <Image fallback={<Skeleton width='500px' height={{ base: '350px', md: '500px' }} />} borderRadius={{ md: '8px 0px 0px 8px', base: '8px 8px 0px 0px' }} minHeight={{ md: '600px', base: '350px' }} maxHeight='750px' height='100%' objectFit='cover' backgroundColor='black' objectPosition='center' src={post.image} alt='' />
          </Box>
          <Flex flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} minWidth='280px' px={2} justifyContent='space-between'>
            <Box>
              <DetailPostHeader user={post.author} location={post.location} avatarSize='lg' postId={post._id} />
              {/* CSS to hide scrollbar */}
              <Box overflow='auto' css={{ msOverflowStyle: 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} maxHeight='350px' px={5}>
                <Text whiteSpace='pre-line' marginBottom={5} p={3}> {post.content}</Text>
                {post.comments && <Comments postId={post._id} comments={post.comments} showViewAll={false} showAvatar />}
              </Box>
            </Box>
            <Box>
              <Social postId={post._id} likes={post.likes} saved={post.saved} />
              <Box px={5} my={3}>
                <DateFormat date={post.createdAt} />
              </Box>
              <hr />
              <CommentForm postId={post._id} />
            </Box>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default DetailPost
