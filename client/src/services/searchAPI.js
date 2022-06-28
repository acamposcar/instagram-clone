import { API_URL } from './endpoint'

const URL = `${API_URL}/search`

export async function search ({ token, query }) {
  const response = await fetch(`${URL}/`, {
    method: 'POST',
    body: JSON.stringify({
      query
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not search the user.')
  }

  // Transform to be able to use it in UserList component
  const users = data.map(user => {
    return { user: { ...user } }
  })

  return users
}
