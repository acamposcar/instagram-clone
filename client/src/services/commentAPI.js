import { API_URL } from './endpoint'

const URL = `${API_URL}/posts`

export async function addComment ({ token, postId, content }) {
  const response = await fetch(`${URL}/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not create the comment.')
  }

  return data.comment
}
