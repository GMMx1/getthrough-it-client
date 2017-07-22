import React from 'react'
import { withRouter } from 'react-router-dom'

import Lobby from '../../containers/Lobby'
import Navbar from '../../components/Navbar'


const LobbyPage = (props) => {
  return (
    <div className="lobby-page">
      <Navbar />
      <Lobby
        lobbyId={props.match.params.id}
      />
    </div>
  )
}

export default withRouter(LobbyPage)
