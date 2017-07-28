export const api = (route) => `/api${route}`

export const HOME = '/'
export const PROFILE = '/me'
export const LOGIN = '/login'
export const LOGOUT = '/logout'

export const CHALLENGES = '/challenges'
export const ADD_CHALLENGE = '/admin/createChallenge'

export const AUTH_ME = '/auth/me'
export const AUTH_LOGOUT = '/auth/logout'
export const AUTH_GITHUB = '/auth/github'

export const LOBBIES = '/lobbies'
export const lobby = (id) => `/lobbies/${id || ':id'}`
export const lobbyChallenges = (id) => `${lobby(id)}/challenges`

export const userLobbies = (id) => `/users/${id}/lobbies`