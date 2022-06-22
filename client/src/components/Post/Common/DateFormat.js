import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Text } from '@chakra-ui/react'

const DateFormat = ({ date }) => {
  const formatDate = (date) => formatDistanceToNow(new Date(date), { addSuffix: true })

  return (

    <Text my={3} fontSize={10} color='textSecondary'>{formatDate(date).toUpperCase()}</Text>

  )
}

export default DateFormat
