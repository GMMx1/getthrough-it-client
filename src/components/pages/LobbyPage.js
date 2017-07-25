import React from 'react'
import { withRouter } from 'react-router-dom'

import Lobby from '../../containers/Lobby'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


const LobbyPage = (props) => {
  return (
    <div className="lobby-page">
      <Navbar />
      <Lobby lobbyId={props.match.params.id} />
      <Footer />
    </div>
  )
}

export default withRouter(LobbyPage)
