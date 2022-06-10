import React, { useState } from 'react'
import { Text } from '@chakra-ui/react'

const Content = ({ username, content, maxWords }) => {
  const [showAll, setShowAll] = useState(false)

  // Show 30 words by default. Add 'more' button to show all
  // Split to wrap complete words
  const contentToShow = showAll || content.split(' ').length < maxWords
    ? content
    : (
      <>
        {content.split(' ').slice(0, maxWords).join(' ')}<Text onClick={() => setShowAll(true)} as='button' color='gray'>... more</Text>
      </>
      )

  return (

    <Text my={1} as='p'>
      <Text as='span' fontWeight={500}>{`${username} `}</Text>
      {contentToShow}
    </Text>

  )
}

export default Content
