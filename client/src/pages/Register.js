import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import RegisterForm from '../components/Form/RegisterForm'
import LogoCard from '../components/LogoCard'
import RegisterLoginLayout from '../components/RegisterLoginLayout'
const Register = () => {
  return (
    <Box marginTop='min(60px, 9vh)' display='flex' justifyContent='center'>
      <RegisterLoginLayout>
        <LogoCard>
          <RegisterForm />
        </LogoCard>
        <Box p={5} display='flex' justifyContent='center' backgroundColor='white' border='solid thin #DBDBDB' width='100%'>
          <Text color='#262626'>Have an account? <Link as={RouterLink} to='/'>Log in</Link></Text>
        </Box>
      </RegisterLoginLayout>
    </Box>
  )
}

export default Register
