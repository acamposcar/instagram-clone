import React, { useCallback, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import Header from './Header'
import Social from './Social'
import Content from './Content'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Card from '../Card'
import DateFormat from './DateFormat'
import RouterLink from '../RouterLink'
const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments)

  const handleAddComment = useCallback((comment) => {
    setComments(prevState => [comment, ...prevState])
  }, [])

  return (

    <Card width='100%' key={post._id}>
      <Header user={post.author} location={post.location} postId={post._id} />
      <Box>
        <RouterLink to={`/posts/${post._id}`}>
          <Image maxHeight='520px' width='100%' objectFit='cover' objectPosition='center' src={post.image} alt='' />
        </RouterLink>
      </Box>
      <Social postId={post._id} likes={post.likes} saved={post.saved} />
      <Box px={5} my={3}>
        <Content username={post.author.username} content={post.content} maxWords={30} />
        <Comments postId={post._id} commentsCount={comments.length} comments={comments.slice(0, 2)} />
        <DateFormat date={post.createdAt} />
      </Box>
      <hr />
      <CommentForm postId={post._id} onAddComment={handleAddComment} />
    </Card>

  )
}

export default Post
