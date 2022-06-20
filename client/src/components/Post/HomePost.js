import React from 'react'
import { Box, Image, Skeleton } from '@chakra-ui/react'
import HomePostHeader from './HomePostHeader'
import Social from './Common/Social'
import Content from './Common/Content'
import Comments from './Common/Comments'
import CommentForm from './Common/CommentForm'
import Card from '../Card'
import DateFormat from './Common/DateFormat'
import RouterLink from '../RouterLink'

const HomePost = ({ post }) => {
  return (

    <Card key={post._id}>
      <HomePostHeader user={post.author} location={post.location} postId={post._id} />
      <Box>
        <RouterLink to={`/posts/${post._id}`}>
          <Image fallback={<Skeleton width='100%' height='400px' />} maxHeight='520px' width='100%' objectFit='cover' objectPosition='center' src={post.image} alt='' />
        </RouterLink>
      </Box>
      <Social postId={post._id} likes={post.likes} saved={post.saved} renderedFromHome />
      <Box px={5} my={3}>
        <Content username={post.author.username} content={post.content} maxWords={30} />
        <Comments postId={post._id} commentsCount={post.comments.length} comments={post.comments.slice(0, 2)} />
        <DateFormat date={post.createdAt} />
      </Box>
      <hr />
      <CommentForm postId={post._id} renderedFromHome />
    </Card>

  )
}

export default HomePost
