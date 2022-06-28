import React, { useLayoutEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import MobileNavbar from './MobileNavbar'
import useAuth from '../../hooks/useAuth'
import CustomSpinner from '../CustomSpinner'
import { SocketProvider } from '../../contexts/socketContext'
const Layout = () => {
  const authCtx = useAuth()
  const location = useLocation()

  useLayoutEffect(() => {
    // Scroll to top position on page change
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header />
      <Container fontSize='sm' marginTop={{ md: '40px', base: '20px' }} marginBottom={'100px'} as='main' px={2} maxW='935px' centerContent>
        {!authCtx.user &&
          <CustomSpinner />}
        {authCtx.user &&
          <SocketProvider userId={authCtx.user._id}>
            <Outlet />
          </SocketProvider>}
      </Container>
      <MobileNavbar />
    </>
  )
}

export default Layout
