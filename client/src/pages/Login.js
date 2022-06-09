import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Link } from '@chakra-ui/react'
import LoginForm from '../components/Form/LoginForm'
import phonesImg from '../assets/loginpage/phones.png'
import screenshotHome from '../assets/loginpage/screenshotHome.png'
import screenshotGallery from '../assets/loginpage/screenshotGallery.png'
import { Link as RouterLink } from 'react-router-dom'
import LogoCard from '../components/LogoCard'
import RegisterLoginLayout from '../components/RegisterLoginLayout'

const Login = () => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const opacityInterval = setInterval(() => {
      setOpacity(prevState => prevState === 0 ? 1 : 0)
    }, 5000)
    return () => clearInterval(opacityInterval)
  }, [])

  return (
    <Box marginTop='min(60px, 9vh)' display='flex' justifyContent='center'>

      <Box display={{ md: 'block', sm: 'none' }} position='relative'>
        <Image position='absolute' top={7} left={155} src={screenshotHome} alt='' />
        <Image position='absolute' opacity={opacity} transition='opacity 2000ms ease' top={7} left={155} src={screenshotGallery} alt='' />
        <Image src={phonesImg} alt='Phones screenshot' />
      </Box>
      <RegisterLoginLayout>
        <LogoCard>
          <LoginForm />
        </LogoCard>
        <Box p={5} display='flex' justifyContent='center' backgroundColor='white' border='solid thin #DBDBDB' width='100%'>
          <Text color='#262626'>Don't have an account? <Link as={RouterLink} to='/register'>Sign up</Link></Text>
        </Box>
      </RegisterLoginLayout>
    </Box>
  )
}

export default Login
