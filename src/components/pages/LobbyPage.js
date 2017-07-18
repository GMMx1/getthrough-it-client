import React from 'react'
import { withRouter } from 'react-router-dom'

import Lobby from '../../containers/Lobby'
import Navbar from '../../components/Navbar'


const LobbyPage = (props) => {
  return (
    <div>
      <Navbar />
      <Lobby
        lobbyId={props.match.params.id}
      />
    </div>
  )
}

export default withRouter(LobbyPage)
