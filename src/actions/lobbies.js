import withHost from '../utils/withHost'
import { fpost } from '../utils/fetchHelper'
import { LOBBIES, lobby } from '../routes'

export const CREATE_LOBBY_REQUEST = 'CREATE_LOBBY_REQUEST'
export const CREATE_LOBBY_SUCCESS = 'CREATE_LOBBY_SUCCESS'
export const CREATE_LOBBY_FAILURE = 'CREATE_LOBBY_FAILURE'

export const createLobby = () => (dispatch) => {
  return fetch(
    withHost(LOBBIES), 
    fpost()
  ).then(res => res.json())
}