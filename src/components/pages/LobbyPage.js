import React from 'react'
import { withRouter } from 'react-router-dom'

import Lobby from '../../containers/Lobby'

const LobbyPage = (props) => {
  var query = new URLSearchParams(props.location.search)
  return (
    <div>
      <Lobby 
        id={props.match.params.id}
        peerId={query.get("peerId")} 
      />
    </div>
  )
}

export default withRouter(LobbyPage)