
import React, { useState, useRef } from 'react'
import {
  Box,
  Button,
  Flex,
  Image,
  FormControl,
  Textarea,
  Input
} from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const ImageForm = () => {
  const captionRef = useRef()
  const locationRef = useRef()
  const [file, setFile] = useState({ preview: undefined, data: undefined })

  const handleSubmit = async (event) => {
    event.preventDefault()

    // const formData = new FormData()
    // formData.append('image', file.data)
    // sendRequest({
    //   url: '/api/v1/users/avatar/',
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${authCtx.token}`
    //   }
    // }, (avatarObj) => {
    //   authCtx.changeAvatar(avatarObj.data)
    //   setFile({ preview: undefined, data: undefined })
    // })
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
        {!file.preview &&
          <Button as='label' htmlFor='image' cursor='pointer' leftIcon={<FaCloudUploadAlt size={20} />}>
            Select File
            <Input
              type='file'
              accept='.jpg,.png,.jpeg'
              hidden
              name='image'
              id='image'
              onChange={handleFileSelection}
            />
          </Button>}
        {file.preview &&
          <Image borderRadius={{ md: '0px 0px 0px 8px', base: 'none' }} maxHeight='450px' minHeight='350px' objectFit='cover' backgroundColor='black' objectPosition='center' src={file.preview} alt='' />}
      </Flex>
      <Flex p={2} alignItems='center' flexDirection='column' maxWidth={{ base: '550px', md: '385px' }} px={5} justifyContent='space-between'>
        <Box width='100%' minWidth='200px'>
          <FormControl>
            <Textarea rows={5} ref={captionRef} aria-label='Write a caption' fontSize={14} placeholder='Write a caption...' borderX='none' borderTop='none' borderRadius={0} name='caption' resize='none' />
          </FormControl>
          <FormControl marginTop={5}>
            <Input ref={locationRef} aria-label='Write a caption' fontSize={14} placeholder='Add a location' borderX='none' borderRadius={0} name='location' />
          </FormControl>
        </Box>
        <Button marginTop={5} variant='ghost' fontSize={14} type='submit'>Share</Button>
      </Flex>
    </Flex>

  )
}

export default ImageForm
