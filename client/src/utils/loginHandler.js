const loginHandler = (response, navigate, from, authCtx) => {
  // Convert expiresIn to miliseconds
  const expirationTime = new Date(
    new Date().getTime() + response.data.expiresIn * 1000
  )

  authCtx.login(response.data.token, expirationTime.toISOString(), response.data.user)

  // Send them back to the page they tried to visit when they were
  // redirected to the login page. Use { replace: true } so we don't create
  // another entry in the history stack for the login page.
  navigate(from, { replace: true })
}

export default loginHandler
