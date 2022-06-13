import React from 'react'
import { Link } from '@chakra-ui/react'
import { Link as RLink } from 'react-router-dom'

const RouterLink = ({ children, to, weight = 500, color = 'black' }) => {
  return (
    <Link as={RLink} to={to} fontWeight={weight} color={color}>
      {children}
    </Link>
  )
}

export default RouterLink
