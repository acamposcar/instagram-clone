import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  Input,
  Image,
  Skeleton
} from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import ImageForm from './ImageForm'
import { addPost } from '../../lib/api'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

const CreatePostForm = ({ closeModal }) => {
  const contentRef = useRef()
  const locationRef = useRef()
  const [file, setFile] = useState({ preview: undefined, data: undefined })
  const authCtx = useAuth()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(addPost, {
    onError: (error) => {
      toast.error(error.message)
      setFile({ preview: undefined, data: undefined })
    },
    onSuccess: (post) => {
      closeModal()
      navigate(`/posts/${post._id}`, { replace: false })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file.data) {
      toast.error('Select an image')
      return
    }
    const formData = new FormData()
    formData.append('image', file.data)
    formData.append('content', contentRef.current.value)
    formData.append('location', locationRef.current.value)
    mutate({ formData, token: authCtx.token })
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
          <Image fallback={<Skeleton width='100%' height='400px' />} borderRadius={{ md: '0px 0px 0px 8px', base: 'none' }} maxHeight='450px' minHeight='350px' objectFit='cover' backgroundColor='black' objectPosition='center' src={file.preview} alt='' />
        </ImageForm>
      </Flex>
      <Flex p={2} alignItems='center' flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} px={5} justifyContent='space-between'>
        <Box width='100%' minWidth='200px'>
          <FormControl marginTop={5}>
            <Textarea rows={5} ref={contentRef} aria-label='Write a caption' fontSize={14} placeholder='Write a caption...' borderX='none' borderRadius={0} name='caption' resize='none' />
          </FormControl>
          <FormControl marginTop={10}>
            <Input ref={locationRef} aria-label='Add a location' fontSize={14} placeholder='Add a location' borderX='none' borderRadius={0} name='location' />
          </FormControl>

        </Box>
        <Button isLoading={isLoading} marginTop={5} variant='ghost' fontSize={16} type='submit'>Share</Button>
      </Flex>
    </Flex>

  )
}

export default CreatePostForm
