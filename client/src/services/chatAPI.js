import { API_URL } from './endpoint'

const URL = `${API_URL}/chat`

export async function sendMessage ({ token, content, conversationId }) {
  const response = await fetch(`${URL}/${conversationId}`, {
    method: 'POST',
    body: JSON.stringify({
      content
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not send the message.')
  }

  return data
}

export async function getConversations (token) {
  const response = await fetch(`${URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch conversations.')
  }

  return data
}

export async function getMessages ({ token, conversationId }) {
  const response = await fetch(`${URL}/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch messages.')
  }

  return data
}

export async function createConversation ({ token, contactId }) {
  const response = await fetch(`${URL}/`, {
    method: 'POST',
    body: JSON.stringify({
      contact: contactId
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not create the conversation.')
  }

  return data
}
