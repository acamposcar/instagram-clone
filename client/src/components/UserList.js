import React from 'react'
import { Flex, Avatar, Box, Grid } from '@chakra-ui/react'
import RouterLink from './RouterLink'

const UserList = ({ list, user = 'user', closeModal }) => {
  return (

    <Box p={3} my={5} maxHeight='500px' overflow='auto'>
      <Grid gap={2} justifyContent='center'>
        {list.map(item => {
          return (
            <Box onClick={closeModal} key={item[user]._id}>
              <RouterLink to={`/accounts/${item[user].username}`}>
                <Flex my={2} gap={3} px={5} alignItems='center' justifyContent='flex-start'>
                  <Avatar size='md' src={`${item[user].avatar}`} />
                  <Box>
                    <Box>
                      {item[user].username}
                    </Box>
                    <Box fontSize={14} fontWeight={400}>
                      {item[user].name}
                    </Box>
                  </Box>
                </Flex>
              </RouterLink>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default UserList
