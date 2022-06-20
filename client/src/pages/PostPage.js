import React from 'react'
import CustomAlert from '../components/CustomAlert'
import useAuth from '../hooks/useAuth'
import { getPost } from '../lib/api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import DetailPost from '../components/Post/DetailPost'
import CustomSpinner from '../components/CustomSpinner'
const PostPage = () => {
  const authCtx = useAuth()
  const { postId } = useParams()

  const { isError, data: post, error } = useQuery(['posts', postId], () => getPost({ token: authCtx.token, postId }))

  if (post) {
    return (
      <DetailPost post={post} />
    )
  }

  if (isError) {
    return <CustomAlert status='error' title='Fetch error!' message={error.message} />
  }

  return (
    // Loading
    <CustomSpinner />
  )
}

export default PostPage
