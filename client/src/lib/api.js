const API_URL = '/api/v1'

function transformPosts (data) {
  const posts = []

  for (const post of data) {
    const likes = post.likes.map(like => {
      return {
        ...like,
        user: {
          ...like.user,
          avatar: `/uploads/avatar/${like.user.avatar}`
        }
      }
    })

    posts.push({
      ...post,
      likes,
      createdAt: new Date(post.createdAt),
      author: {
        username: post.author.username,
        name: post.author.name,
        avatar: `/uploads/avatar/${post.author.avatar}`
      },
      image: `/uploads/posts/${post.image}`

    })
  }

  return posts
}
export async function getPosts (token) {
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText || 'Could not fetch posts.')
  }

  const data = await response.json()

  const posts = transformPosts(data.posts)
  return posts
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

  const posts = transformPosts(data.posts)
  const saved = transformPosts(data.saved)

  const user = {
    username: data.user.username,
    name: data.user.name,
    bio: data.user.bio,
    avatar: `/uploads/avatar/${data.user.avatar}`
  }
  const following = data.following.map(follow => {
    return {
      ...follow,
      following: {
        ...follow.following,
        avatar: `/uploads/avatar/${follow.following.avatar}`
      }
    }
  })
  const followers = data.followers.map(follow => {
    return {
      ...follow,
      user: {
        ...follow.user,
        avatar: `/uploads/avatar/${follow.user.avatar}`
      }
    }
  })

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

  const likes = data.likes.map(like => {
    return {
      ...like,
      user: {
        ...like.user,
        avatar: `/uploads/avatar/${like.user.avatar}`
      }
    }
  })

  const comments = data.comments.map(comment => {
    return {
      ...comment,
      author: {
        ...comment.author,
        avatar: `/uploads/avatar/${comment.author.avatar}`
      }
    }
  })

  const post = {
    ...data,
    likes,
    comments,
    createdAt: new Date(data.createdAt),
    author: {
      username: data.author.username,
      name: data.author.name,
      avatar: `/uploads/avatar/${data.author.avatar}`
    },
    image: `/uploads/posts/${data.image}`

  }
  return post
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

export async function addPost ({ token, formData }) {
  const response = await fetch(`${API_URL}/posts/`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

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
  const comment = {
    ...data,
    createdAt: new Date(data.createdAt),
    author: {
      username: data.author.username,
      name: data.author.name,
      avatar: `/uploads/avatar/${data.author.avatar}`
    }
  }
  return comment
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
  const response = await fetch(`${API_URL}/users/avatar/`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not update the avatar.')
  }

  return data
}
