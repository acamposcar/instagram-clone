import { API_URL } from './endpoint'

const URL = `${API_URL}/posts`

export async function getPosts ({ token, allPosts }) {
  let url

  if (allPosts) {
    url = `${URL}/`
  } else {
    url = `${URL}/following`
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch posts.')
  }

  return data.posts
}

export async function getPost ({ token, postId }) {
  const response = await fetch(`${URL}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch post.')
  }

  return data
}

export async function deletePost ({ token, postId }) {
  const response = await fetch(`${URL}/${postId}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not like the post.')
  }

  return null
}

export async function toggleLikePost ({ token, postId }) {
  const response = await fetch(`${URL}/${postId}/like`, {
    method: 'POST',
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

export async function toggleSavePost ({ token, postId }) {
  const response = await fetch(`${URL}/${postId}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Could not save the post.')
  }

  return data
}

export async function addPost ({ token, formData, location, content }) {
  let response = await fetch('https://api.cloudinary.com/v1_1/dr2slpzm1/image/upload', {
    method: 'POST',
    body: formData
  })

  let data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not upload the file.')
  }

  response = await fetch(`${URL}/`, {
    method: 'POST',
    body: JSON.stringify({
      location,
      content,
      image: data.secure_url
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not create the post.')
  }

  return data
}
