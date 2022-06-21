
import React from 'react'
import { Tab } from '@chakra-ui/react'

const CustomTabMobile = (props) => {
  return (
    <Tab px={10} fontSize={12} color='var(--textSecondary)' border='none' _selected={{ color: 'black', borderBottom: 'solid 2px black' }}>
      {props.children}
    </Tab>
  )
}

export default CustomTabMobile
