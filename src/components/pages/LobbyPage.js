import React from 'react'
import { withRouter } from 'react-router-dom'

import Lobby from '../../containers/Lobby'

const LobbyPage = (props) => {
  return (
    <div>
      <Lobby id={Number(props.match.params.id)} />
    </div>
  )
}

export default withRouter(LobbyPage)