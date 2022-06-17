import React, { useEffect, useState, useCallback } from 'react'
import { Flex, Image, Box, Alert, AlertIcon, AlertTitle, Text } from '@chakra-ui/react'
import Card from '../components/Card'
import Social from '../components/Posts/Social'
import LikedBy from '../components/Posts/LikedBy'
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
            <Image borderRadius={{ md: '8px 0px 0px 8px', base: '8px 8px 0px 0px' }} minHeight='620px' height='100%' objectFit='cover' backgroundColor='black' objectPosition='center' src={post.image} alt='' />

          </Box>
          <Flex flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} minWidth='280px' px={5} justifyContent='space-between'>
            <Box>
              <Header user={post.author} location={post.location} avatarSize='lg' postId={post._id} />
              {/* CSS to hide scrollbar */}
              <Box overflow='auto' css={{ msOverflowStyle: 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }} maxHeight='350px'>
                <Text whiteSpace='pre-line' marginBottom={5} p={3}> {post.content}</Text>
                {comments && <Comments postId={post._id} comments={comments} showViewAll={false} showAvatar />}
              </Box>
            </Box>
            <Box>
              <Social postId={post._id} likes={post.likes} saved={post.saved} />
              <DateFormat date={post.createdAt} />
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
