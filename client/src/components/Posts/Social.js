/** @jsxImportSource @emotion/react */

import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { ReactComponent as HeartOutlineIcon } from '../../assets/icons/heartOutline.svg'
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg'

const Social = () => {
  return (

    <Flex p={3} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Box as='button'>
          <HeartOutlineIcon css={{ '&:hover': { fill: '#8e8e8e' } }} />
        </Box>
        <Box as='button'>
          <CommentIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
        </Box>
        <Box as='button'>
          <ShareIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
        </Box>
      </Flex>
      <Box as='button'>
        <SaveIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
      </Box>

    </Flex>

  )
}

export default Social
