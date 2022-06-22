const API_URL = '/api/v1'

export async function getPosts ({ token, allPosts }) {
  let url

  if (allPosts) {
    url = `${API_URL}/posts`
  } else {
    url = `${API_URL}/posts/following`
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

export async function getUserPosts ({ token, username }) {
  const response = await fetch(`${API_URL}/users/${username}`, {
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

export async function getPost ({ token, postId }) {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
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
  const response = await fetch(`${API_URL}/posts/${postId}/`, {
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

export async function toggleFollow ({ token, username }) {
  const response = await fetch(`${API_URL}/users/${username}/follow`, {
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

export async function toggleLikePost ({ token, postId }) {
  const response = await fetch(`${API_URL}/posts/${postId}/like`, {
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
  const response = await fetch(`${API_URL}/posts/${postId}/save`, {
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

  response = await fetch(`${API_URL}/posts/`, {
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

export async function addComment ({ token, postId, content }) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
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

export async function updateProfile ({ token, username, profileData }) {
  const response = await fetch(`${API_URL}/users/${username}/`, {
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

export async function registerUser (user) {
  const response = await fetch(`${API_URL}/auth/register/`, {
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
  const response = await fetch(`${API_URL}/auth/login/`, {
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

export async function updateAvatar ({ formData, token }) {
  let response = await fetch('https://api.cloudinary.com/v1_1/dr2slpzm1/image/upload', {
    method: 'POST',
    body: formData
  })

  let data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not upload the file.')
  }

  response = await fetch(`${API_URL}/users/avatar/`, {
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

export async function search ({ token, query }) {
  const response = await fetch(`${API_URL}/search/`, {
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
