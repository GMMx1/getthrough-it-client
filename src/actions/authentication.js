import { createAction } from 'redux-actions'

import { AUTH_ME, AUTH_LOGOUT } from '../routes'
import { withHost, fget } from '../utils/fetchHelper'

export const CHECK_AUTHENTICATION_REQUEST = 'CHECK_AUTHENTICATION_REQUEST'
export const CHECK_AUTHENTICATION_SUCCESS = 'CHECK_AUTHENTICATION_SUCCESS'
export const CHECK_AUTHENTICATION_FAILURE = 'CHECK_AUTHENTICATION_FAILURE'

const checkAuthenticationRequest = createAction(CHECK_AUTHENTICATION_REQUEST)
const checkAuthenticationSuccess = createAction(CHECK_AUTHENTICATION_SUCCESS)
const checkAuthenticationFailure = createAction(CHECK_AUTHENTICATION_FAILURE)

export const checkAuthentication = () => {
  return (dispatch) => {
    dispatch(checkAuthenticationRequest())
    return fetch(withHost(AUTH_ME), fget())
    .then((res) => res.json())
    .then((user) => dispatch(checkAuthenticationSuccess(user)))
    .catch((error) => dispatch(checkAuthenticationFailure(error)))
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const logoutRequest = createAction(LOGOUT_REQUEST)
const logoutSuccess = createAction(LOGOUT_SUCCESS)
const logoutFailure = createAction(LOGOUT_FAILURE)

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutRequest())
    return fetch(withHost(AUTH_LOGOUT), fget())
    .then(() => dispatch(logoutSuccess()))
    .catch((error) => dispatch(logoutFailure(error)))
  }
}