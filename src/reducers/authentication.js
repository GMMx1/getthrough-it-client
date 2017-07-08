export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const initialState = {
  user: null,
  isLoading: false,
}

export const ajaxReducer = (state, action) => {
  if (action.type.endsWith('REQUEST')) {
    return { isLoading: true }
  } else {
    return { isLoading: false }
  }
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true }
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isLoading: false }
    case LOGIN_FAILURE:
      return { ...state, isLoading: false }
    default: 
      return state
  }
}

export default authReducer