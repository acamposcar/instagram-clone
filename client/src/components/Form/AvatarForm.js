
import React, { useState, useRef } from 'react'
import {
  Box,
  Flex,
  Button,
  Avatar
} from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import AlertError from '../AlertError'
import ImageForm from './ImageForm'
const AvatarForm = ({ closeModal, updateAvatar }) => {
  const [file, setFile] = useState({ preview: undefined, data: undefined })
  const { loading, sendRequest, error } = useFetch()
  const authCtx = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('avatar', file.data)

    sendRequest({
      url: '/api/v1/users/avatar',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authCtx.token}`
      }
    }, (response) => {
      updateAvatar(response.data)
      closeModal()
    })
  }

  const handleFileSelection = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    })
  }

  return (
    <Flex as='form' onSubmit={handleSubmit} flexDirection='column' alignItems='center' justifyContent='center' my={5}>
      <ImageForm handleFileSelection={handleFileSelection} file={file}>
        <Avatar height='200px' width='200px' src={file.preview} alt='' />
      </ImageForm>
      <Box width='100%' minWidth='200px'>
        {error && <AlertError error={error} />}
      </Box>
      <Button isLoading={loading} marginTop={5} variant='ghost' fontSize={16} type='submit'>Save</Button>
    </Flex>

  )
}

export default AvatarForm
