const API_URL = '/api/v1/'

function transformPosts (data) {
  const posts = []

  for (const post of data) {
    const likes = post.likes.map(like => {
      return {
        ...like,
        likedBy: {
          ...like.likedBy,
          avatar: `/uploads/avatar/${like.likedBy.avatar}`
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
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch posts.')
  }

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
    avatar: `/uploads/avatar/${data.user.avatar}`
  }
  const following = data.following
  const followers = data.followers

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
      likedBy: {
        ...like.likedBy,
        avatar: `/uploads/avatar/${like.likedBy.avatar}`
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

export async function followUnfollow ({ token, username }) {
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

  return null
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

  return null
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
    throw new Error(data.error || 'Could not like the post.')
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
