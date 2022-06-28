import React from 'react'
import { Flex, Avatar, Box, Grid, Spinner } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { createConversation } from '../../services/chatAPI'
import useAuth from '../../hooks/useAuth'

const NewConversationList = ({ list, user, onClose, onSelectConversation }) => {
  const authCtx = useAuth()

  const queryClient = useQueryClient()

  const handleClick = contactId => {
    // create conversation!
    mutate({ token: authCtx.token, contactId })
  }

  const { mutate, isLoading } = useMutation(createConversation, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (conversation) => {
      queryClient.invalidateQueries('conversations')
      onClose()
      onSelectConversation(conversation._id)
    }
  })

  return (
    <Box p={3} my={5} maxHeight='500px' overflow='auto'>
      <Grid gap={2} justifyContent='center'>
        {list.map(item => {
          return (
            <Box as='button' textAlign='left' onClick={() => handleClick(item[user]._id)} key={item[user]._id} _hover={{ color: 'blue.500' }}>
              <Flex my={2} gap={3} px={5} alignItems='center' justifyContent='flex-start'>
                <Avatar size='md' src={`${item[user].avatar}`} />
                <Box>
                  <Box fontWeight={500}>
                    {item[user].username}
                  </Box>
                  <Box fontSize={14} fontWeight={400}>
                    {item[user].name}
                  </Box>
                </Box>
              </Flex>
            </Box>
          )
        })}
        {isLoading &&
          <Flex justifyContent='center' mt={5}>
            <Spinner />
          </Flex>}
      </Grid>

    </Box>
  )
}

export default NewConversationList
