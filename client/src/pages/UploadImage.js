import React from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { ReactComponent as PlusOutlineIcon } from '../assets/icons/plusOutline.svg'
import ImageForm from '../components/UploadImage/ImageForm'

const UploadImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box _hover={{ cursor: 'pointer' }}>
        <PlusOutlineIcon onClick={onOpen} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={{ md: '600px', base: '320px' }} borderRadius='8px'>
          <ModalHeader textAlign='center' fontSize={15} borderBottom='1px solid var(--borderColor)'>Create a New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <ImageForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UploadImage
