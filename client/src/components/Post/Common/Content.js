import React, { useState } from 'react'
import { Text } from '@chakra-ui/react'
import RouterLink from '../../RouterLink'

const Content = ({ username, content, maxWords }) => {
  const [showAll, setShowAll] = useState(false)

  // Show 30 words by default. Add 'more' button to show all
  // Split to wrap complete words
  const contentToShow = showAll || content.split(' ').length < maxWords
    ? content
    : (
      <>
        {content.split(' ').slice(0, maxWords).join(' ')}<Text onClick={() => setShowAll(true)} as='button' color='gray'>... more</Text>
      </>)

  return (
    <>
      {content &&
        <Text my={1} as='p' whiteSpace='pre-line'>
          <RouterLink to={`/accounts/${username}`}>
            {username}
          </RouterLink>
          {' '}
          {contentToShow}
        </Text>}
    </>
  )
}

export default Content
