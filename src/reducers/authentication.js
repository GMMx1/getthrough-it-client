import { handleActions } from 'redux-actions'

import {
  CHECK_AUTHENTICATION_REQUEST,
  CHECK_AUTHENTICATION_SUCCESS,
  CHECK_AUTHENTICATION_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/authentication'

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

export const ajaxReducer = (state, action) => {
  if (action.type.endsWith('REQUEST')) {
    return { isLoading: true }
  } else {
    return { isLoading: false }
  }
}

const authReducer = handleActions({
  CHECK_AUTHENTICATION_REQUEST: (state, action) => ({
    ...state,
    isLoading: true,
    error: null
  }),
  CHECK_AUTHENTICATION_SUCCESS: (state, action) => ({
    ...state,
    isLoading: false,
    user: action.payload
  }),
  CHECK_AUTHENTICATION_FAILURE: (state, action) => ({
    ...state,
    isLoading: false,
    user: null
  }),
  LOGOUT_REQUEST: (state, action) => ({
    ...state,
    isLoading: true,
    error: null
  }),
  LOGOUT_SUCCESS: (state, action) => ({
    ...state,
    isLoading: false,
    user: null
  }),
  LOGOUT_FAILURE: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })
}, initialState)

export default authReducer