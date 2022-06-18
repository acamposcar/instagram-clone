/** @jsxImportSource @emotion/react */

import React from 'react'
import { Tabs, TabList, TabPanels, Box, useBreakpointValue } from '@chakra-ui/react'
import { ReactComponent as PostsIcon } from '../../assets/icons/profile/posts.svg'
import { ReactComponent as SavedIcon } from '../../assets/icons/profile/saved.svg'
import { ReactComponent as SavedMobileIcon } from '../../assets/icons/profile/savedMobile.svg'
import { ReactComponent as PostsMobileIcon } from '../../assets/icons/profile/postsMobile.svg'
import CustomTabDesktop from './CustomTabDesktop'
import CustomTabMobile from './CustomTabMobile'
const TabsNav = (props) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })

  return (
    <Tabs width='100%' isLazy marginTop={{ md: '35px', base: '0' }}>
      <TabList justifyContent='center' gap={7} backgroundColor={{ md: 'transparent', base: 'white' }}>
        {breakpoint === 'desktop' &&
          <>
            <CustomTabDesktop>
              <PostsIcon css={{ color: 'currentColor' }} />
              <Box>POSTS</Box>
            </CustomTabDesktop>
            <CustomTabDesktop>
              <SavedIcon css={{ color: 'currentColor' }} />
              <Box>SAVED</Box>
            </CustomTabDesktop>
          </>}
        {breakpoint !== 'desktop' &&
          <>
            <CustomTabMobile>
              <PostsMobileIcon css={{ color: 'currentColor' }} />
            </CustomTabMobile>
            <CustomTabMobile>
              <SavedMobileIcon css={{ color: 'currentColor' }} />
            </CustomTabMobile>
          </>}
      </TabList>
      <TabPanels>

        {props.children}

      </TabPanels>
    </Tabs>
  )
}

export default TabsNav
