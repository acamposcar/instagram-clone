
import React, { useState } from 'react'
import { Image, AspectRatio, Box, Flex, Text, Center } from '@chakra-ui/react'
import { ReactComponent as HeartIcon } from '../../assets/icons/profile/heart.svg'
import { FaComment } from 'react-icons/fa'
import RouterLink from '../RouterLink'
const BoxImage = ({ index = 1, postId, image, commentsCount, likesCount, alternateSpan }) => {
  const [showCount, setShowCount] = useState(false)

  const spanLength = index % 9 === 0 && alternateSpan ? 'span 2' : 'span 1'
  return (
    <Box gridColumn={spanLength} gridRow={spanLength}>
      <RouterLink to={`/posts/${postId}`}>
        <AspectRatio ratio={1} onMouseEnter={() => setShowCount(true)} onMouseLeave={() => setShowCount(false)}>
          <Box position='relative'>
            <Image width='100%' height='100%' objectFit='cover' src={image} />
            {showCount &&
              <Center position='absolute' inset={0} width='100%' height='100%' backgroundColor='rgba(0, 0, 0, 0.3)' color='white'>
                <Flex flexWrap='wrap' justifyContent='center' gap={10} margin='auto 0' flex={1}>
                  <Flex gap={2} alignItems='center'>
                    <HeartIcon />
                    <Text as='div'>{likesCount}</Text>
                  </Flex>
                  <Flex gap={2} alignItems='center'>
                    <FaComment size={23} fill='white' />
                    <Text as='div'>{commentsCount}</Text>
                  </Flex>
                </Flex>
              </Center>}
          </Box>
        </AspectRatio>
      </RouterLink>
    </Box>
  )
}

export default BoxImage
