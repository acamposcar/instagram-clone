const API_URL = '/api/v1/'

function transformPosts (data) {
  const posts = []

  for (const post of data) {
    posts.push({
      ...post,
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
  const response = await fetch(`${API_URL}/users/accounts/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  console.log(data)
  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch posts.')
  }

  const posts = transformPosts(data.posts)

  const user = {
    username: data.user.username,
    name: data.user.name,
    avatar: `/uploads/avatar/${data.user.avatar}`
  }

  return { posts, user }
}

export async function getPost ({ token, postId }) {
  console.log(postId)
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not fetch post.')
  }

  const post = {
    ...data,
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

export async function addQuote (quoteData) {
  const response = await fetch(`${API_URL}/quotes`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Could not create quote.')
  }

  return null
}
