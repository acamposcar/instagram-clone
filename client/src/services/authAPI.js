import { API_URL } from './endpoint'

const URL = `${API_URL}/auth`

export async function registerUser (user) {
  const response = await fetch(`${URL}/register/`, {
    method: 'POST',
    body: JSON.stringify({
      username: user.username,
      password: user.password,
      name: user.name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not register the user.')
  }

  return data
}

export async function loginUser (user) {
  const response = await fetch(`${URL}/login/`, {
    method: 'POST',
    body: JSON.stringify({
      username: user.username,
      password: user.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not log in the user.')
  }

  return data
}
