import { API_URL } from './endpoint'

const URL = `${API_URL}/users`

export async function getUserPosts ({ token, username }) {
  const response = await fetch(`${URL}/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch posts.')
  }

  const { posts, user, following, followers, saved } = data

  return { posts, user, following, followers, saved }
}

export async function toggleFollow ({ token, username }) {
  const response = await fetch(`${URL}/${username}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not follow the user.')
  }

  return data
}

export async function updateProfile ({ token, username, profileData }) {
  const response = await fetch(`${URL}/${username}/`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not like the post.')
  }

  return data
}

export async function updateAvatar ({ formData, token }) {
  let response = await fetch('https://api.cloudinary.com/v1_1/dr2slpzm1/image/upload', {
    method: 'POST',
    body: formData
  })

  let data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not upload the file.')
  }

  response = await fetch(`${URL}/avatar/`, {
    method: 'POST',
    body: JSON.stringify({
      avatar: data.secure_url
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not update the avatar.')
  }

  return data
}
