import React from 'react'
import { Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileNavbar from './MobileNavbar'
import useAuth from '../../hooks/useAuth'
import CustomSpinner from '../CustomSpinner'
const Layout = () => {
  const authCtx = useAuth()
  return (
    <>
      <Header />
      <Container fontSize='sm' marginTop={10} marginBottom='100px' as='main' px={2} maxW='935px' centerContent>
        {!authCtx.user &&
          <CustomSpinner />}
        {authCtx.user &&
          <Outlet />}
      </Container>
      <MobileNavbar />
    </>
  )
}

export default Layout
