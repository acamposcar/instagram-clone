
import React from 'react'
import { Tab } from '@chakra-ui/react'

const CustomTabMobile = (props) => {
  return (
    <Tab fontSize={12} color='var(--textSecondary)' border='none' _selected={{ color: '#0095f6' }}>
      {props.children}
    </Tab>
  )
}

export default CustomTabMobile
