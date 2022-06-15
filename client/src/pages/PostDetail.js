import React, { useEffect } from 'react'
import { Flex, Image, Box, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Card from '../components/Card'
import Social from '../components/Posts/Social'
import Liked from '../components/Posts/Liked'
import DateFormat from '../components/Posts/DateFormat'
import Comments from '../components/Posts/Comments'
import CommentForm from '../components/Posts/CommentForm'
import Header from '../components/Posts/Header'
import useHttp from '../hooks/useHttp'
import { getPost } from '../lib/api'
import { useParams } from 'react-router-dom'
import AlertError from '../components/AlertError'
import PostSkeleton from '../components/Posts/PostSkeleton'
import useAuth from '../hooks/useAuth'

const PostDetail = () => {
  const { postId } = useParams()
  const { sendRequest, loading, data: post, error } = useHttp(getPost, true)
  const authCtx = useAuth()

  useEffect(() => {
    sendRequest({ token: authCtx.token, postId })
  }, [sendRequest, postId, authCtx.token])

  if (loading) return <PostSkeleton />

  if (error) {
    return (
      <AlertError error={error} />
    )
  }

  if (!post) {
    return (
      <Alert marginY={6} status='warning' variant='left-accent'>
        <AlertIcon />
        <AlertTitle>No post found</AlertTitle>
      </Alert>
    )
  }

  return (
    <Flex fontSize='sm' my={8} as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Card width='auto'>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box maxWidth='550px'>
            <Image borderRadius={{ md: '8px 0px 0px 8px', base: '8px 8px 0px 0px' }} minHeight='600px' objectFit='cover' backgroundColor='black' objectPosition='center' src={post.image} alt='' />

          </Box>
          <Flex flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} px={5} justifyContent='space-between'>
            <Box>
              <Header user={post.author} location={post.location} avatarSize='lg' />
              {/* CSS to hide scrollbar */}
              <Box overflow='auto' css={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } }} maxHeight='350px'>
                <Box marginBottom={5} p={3}> {post.content}</Box>
                <Comments postId={post._id} comments={post.comments} showViewAll={false} showAvatar />
              </Box>
            </Box>
            <Box>
              <Social />
              <Liked likes={post.likes} />
              <DateFormat date={post.createdAt} />
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
