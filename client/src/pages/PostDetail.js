import React, { useEffect, useState, useCallback } from 'react'
import { Flex, Image, Box, Alert, AlertIcon, AlertTitle, Text } from '@chakra-ui/react'
import Card from '../components/Card'
import Social from '../components/Post/Social'
import DateFormat from '../components/Post/DateFormat'
import Comments from '../components/Post/Comments'
import CommentForm from '../components/Post/CommentForm'
import useHttp from '../hooks/useHttp'
import { getPost } from '../lib/api'
import { useParams } from 'react-router-dom'
import AlertError from '../components/AlertError'
import PostSkeleton from '../components/Post/PostSkeleton'
import useAuth from '../hooks/useAuth'
import HeaderDetail from '../components/Post/HeaderDetail'

const PostDetail = () => {
  const { postId } = useParams()
  const { sendRequest, loading, data: post, error, success } = useHttp(getPost, true)
  const authCtx = useAuth()

  const [comments, setComments] = useState()

  const handleAddComment = useCallback((comment) => {
    setComments(prevState => [comment, ...prevState])
  }, [])

  useEffect(() => {
    sendRequest({ token: authCtx.token, postId })
  }, [sendRequest, postId, authCtx.token])

  useEffect(() => {
    if (success) setComments(post.comments)
  }, [success, post])

  if (loading || !authCtx.user) return <PostSkeleton />

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
    <Flex fontSize='sm' marginTop={8} marginBottom='100px' as='main' justifyContent='center' maxWidth='935px' mx='auto' px={1}>
      <Card width='auto'>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box maxWidth='550px'>
            <Image borderRadius={{ md: '8px 0px 0px 8px', base: '8px 8px 0px 0px' }} minHeight={{ md: '600px', base: '350px' }} maxHeight='750px' height='100%' objectFit='cover' backgroundColor='black' objectPosition='center' src={post.image} alt='' />
          </Box>
          <Flex flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} minWidth='280px' px={2} justifyContent='space-between'>
            <Box>
              <HeaderDetail user={post.author} location={post.location} avatarSize='lg' postId={post._id} />
              {/* CSS to hide scrollbar */}
              <Box overflow='auto' css={{ msOverflowStyle: 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} maxHeight='350px' px={5}>
                <Text whiteSpace='pre-line' marginBottom={5} p={3}> {post.content}</Text>
                {comments && <Comments postId={post._id} comments={comments} showViewAll={false} showAvatar />}
              </Box>
            </Box>
            <Box>

              <Social postId={post._id} likes={post.likes} saved={post.saved} />
              <Box px={5} my={3}>
                <DateFormat date={post.createdAt} />
              </Box>
              <hr />
              <CommentForm postId={post._id} onAddComment={handleAddComment} />
            </Box>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default PostDetail
