import { useReducer, useCallback } from 'react'

const httpReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      data: null,
      error: null,
      loading: true
    }
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      loading: false
    }
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      loading: false
    }
  }

  return state
}

const useHttp = (requestFunction, startLoading = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: !!startLoading,
    data: null,
    error: null
  })

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'LOADING' })
      try {
        const responseData = await requestFunction(requestData)
        dispatch({ type: 'SUCCESS', responseData })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!'
        })
      }
    },
    [requestFunction]
  )

  return {
    sendRequest,
    ...httpState
  }
}

export default useHttp
