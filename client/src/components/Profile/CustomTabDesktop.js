
import React from 'react'
import { Tab, Flex } from '@chakra-ui/react'

const CustomTabDesktop = (props) => {
  return (
    <Tab fontSize={12} color='var(--textSecondary)' _selected={{ color: 'black', borderColor: 'black' }}>
      <Flex gap={1} alignItems='center'>
        {props.children}
      </Flex>
    </Tab>
  )
}

export default CustomTabDesktop
