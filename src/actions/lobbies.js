import { fget, fpost, fput, withHost } from '../utils/fetchHelper'
import { LOBBIES, lobby, userLobbies } from '../routes'

export const CREATE_LOBBY_REQUEST = 'CREATE_LOBBY_REQUEST'
export const CREATE_LOBBY_SUCCESS = 'CREATE_LOBBY_SUCCESS'
export const CREATE_LOBBY_FAILURE = 'CREATE_LOBBY_FAILURE'

export const createLobby = () => (dispatch) => {
  return fetch(
    withHost(LOBBIES), 
    fpost()
  ).then(res => res.json())
}

// TODO: Move to user actions.
export const getUserLobbies = (userId) => (dispatch) => {
  return fetch(
    withHost(userLobbies(userId)),
    fget()
  ).then(res => res.json())
}

export const associateUserToLobby = (userId, lobbyUrl) => (dispatch) => {
  return fetch(
    withHost(userLobbies(userId)),
    fput({ lobbyUrl })
  ).then(res => res.json())
}
