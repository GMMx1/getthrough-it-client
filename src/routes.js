export const api = (route) => `/api${route}`

export const HOME = '/'
export const LOGIN = '/login'
export const LOGOUT = '/logout'
export const ADD_CHALLENGE = '/admin/createChallenge'

export const LOBBIES = '/lobbies'
export const lobby = (id) => `/lobbies/${id || ':id'}`
