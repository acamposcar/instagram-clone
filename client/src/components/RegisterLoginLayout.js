
import React from 'react'
import { VStack, Text, HStack, Link, Image } from '@chakra-ui/react'
import appStore from '../assets/loginpage/appStore.png'
import playStore from '../assets/loginpage/playStore.png'

const RegisterLoginLayout = (props) => {
  return (
    <VStack gap={3} width='350px'>
      {props.children}
      <Text color='gray'>Get the app</Text>
      <HStack justifyContent='center'>
        <Link width='40%' href='https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo' isExternal>
          <Image src={appStore} alt='App Store' />
        </Link>
        <Link width='40%' href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D31A5E4D9-DDF0-46F6-934D-F88FD62BF75A%26utm_content%3Dlo%26utm_medium%3Dbadge' isExternal>
          <Image src={playStore} alt='PlayStore' />
        </Link>
      </HStack>
    </VStack>

  )
}

export default RegisterLoginLayout
