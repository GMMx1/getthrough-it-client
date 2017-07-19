export const api = (route) => `/api${route}`

export const HOME = '/'
export const LOGIN = '/login'
export const LOGOUT = '/logout'

export const lobby = (id) => `/lobbies/${id || ':id'}`
