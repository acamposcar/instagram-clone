import React, { useLayoutEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import MobileNavbar from './MobileNavbar'
import useAuth from '../../hooks/useAuth'
import CustomSpinner from '../CustomSpinner'

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
          <Outlet />}
      </Container>
      <MobileNavbar />
    </>
  )
}

export default Layout
