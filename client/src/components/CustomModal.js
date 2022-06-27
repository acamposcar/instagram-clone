import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'

const CustomModal = ({ title, children, isOpen, onClose, minW = '400px' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={{ md: minW, base: '320px' }} borderRadius='8px' marginX={2}>
        <ModalHeader textAlign='center' fontSize={15} borderBottom='1px solid' borderColor='borderColor'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
