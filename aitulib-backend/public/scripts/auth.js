const form = document.getElementById('authForm')
const formMessage = document.getElementById('formMessage')

const setMessage = (text, type) => {
  formMessage.textContent = text
  formMessage.classList.remove('error', 'success')
  if (type) {
    formMessage.classList.add(type)
  }
}

const storeSession = (payload) => {
  localStorage.setItem('accessToken', payload.accessToken)
  localStorage.setItem(
    'user',
    JSON.stringify({
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    }),
  )
  localStorage.setItem('login', payload.username)
  localStorage.setItem('isLoggedIn', 'true')
}

const getPageType = () => document.body.dataset.page

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  setMessage('')

  const pageType = getPageType()
  const password = document.getElementById('password').value.trim()

  if (!password) {
    setMessage('Password is required.', 'error')
    return
  }

  let endpoint = '/api/auth/signin'
  let payload = {}

  if (pageType === 'signup') {
    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const confirmPassword = document
      .getElementById('confirmPassword')
      .value.trim()

    if (!username || !email) {
      setMessage('Username and email are required.', 'error')
      return
    }

    if (password.length < 6) {
      setMessage('Password should be at least 6 characters.', 'error')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.', 'error')
      return
    }

    endpoint = '/api/auth/signup'
    payload = { username, email, password }
  } else {
    const identity = document.getElementById('identity').value.trim()
    if (!identity) {
      setMessage('Enter your username or email.', 'error')
      return
    }
    payload = identity.includes('@')
      ? { email: identity, password }
      : { username: identity, password }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (!response.ok) {
      let errorMessage = data.message || 'Authentication failed.'

      if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        errorMessage = data.errors[0]
      }

      setMessage(errorMessage, 'error')
      return
    }

    storeSession(data)
    setMessage('Success! Redirecting...', 'success')

    setTimeout(() => {
      window.location.href = '/'
    }, 900)
  } catch (error) {
    setMessage('Network error. Please try again.', 'error')
  }
})
