import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  Input,
  Image
} from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import AlertError from '../AlertError'
import ImageForm from './ImageForm'

const CreatePostForm = ({ closeModal }) => {
  const contentRef = useRef()
  const locationRef = useRef()
  const [file, setFile] = useState({ preview: undefined, data: undefined })
  const { loading, sendRequest, error } = useFetch()
  const authCtx = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', file.data)
    formData.append('content', contentRef.current.value)
    formData.append('location', locationRef.current.value)

    sendRequest({
      url: '/api/v1/posts/',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authCtx.token}`
      }
    }, (post) => {
      closeModal()
      navigate(`/posts/${post._id}`, { replace: false })
    })
  }

  const handleFileSelection = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    })
  }

  return (
    <Flex as='form' onSubmit={handleSubmit} flexDirection={{ base: 'column', md: 'row' }}>
      <Flex maxWidth='500px' minWidth='300px' minHeight='100px' justifyContent='center' alignItems='center'>
        <ImageForm handleFileSelection={handleFileSelection} file={file}>
          <Image borderRadius={{ md: '0px 0px 0px 8px', base: 'none' }} maxHeight='450px' minHeight='350px' objectFit='cover' backgroundColor='black' objectPosition='center' src={file.preview} alt='' />}
        </ImageForm>
      </Flex>
      <Flex p={2} alignItems='center' flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} px={5} justifyContent='space-between'>
        <Box width='100%' minWidth='200px'>
          {error && <AlertError error={error} />}
          <FormControl>
            <Textarea rows={5} ref={contentRef} aria-label='Write a caption' fontSize={14} placeholder='Write a caption...' borderX='none' borderTop='none' borderRadius={0} name='caption' resize='none' />
          </FormControl>
          <FormControl marginTop={5}>
            <Input ref={locationRef} aria-label='Write a caption' fontSize={14} placeholder='Add a location' borderX='none' borderRadius={0} name='location' />
          </FormControl>
        </Box>
        <Button isLoading={loading} marginTop={5} variant='ghost' fontSize={16} type='submit'>Share</Button>
      </Flex>
    </Flex>

  )
}

export default CreatePostForm
