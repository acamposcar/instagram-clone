import React from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import { ReactComponent as PlusOutlineIcon } from '../assets/icons/plusOutline.svg'
import CreatePostForm from '../components/Form/CreatePostForm'
import CustomModal from '../components/CustomModal'

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title='Create a new post' minW='600px'>
        <CreatePostForm closeModal={onClose} />
      </CustomModal>

      <Box _hover={{ cursor: 'pointer' }}>
        <PlusOutlineIcon onClick={onOpen} />
      </Box>
    </>
  )
}

export default CreatePost
