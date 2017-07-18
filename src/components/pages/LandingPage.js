import React from 'react'
import { withRouter } from 'react-router-dom'

import CreateLobby from '../../components/CreateLobby'
import Navbar from '../../components/Navbar'
console.log(__dirname)
const LandingPage = (props) => {
  return (
    <div id="landingPage">
      <Navbar />
      <div id="landingPage_description">
        <h2>GET_THROUGH_IT</h2>
        <p>The modern online collaborative text editor</p>
      </div>
      <div id="landingPageGif" />
      <CreateLobby />
    </div>
  )
}

export default withRouter(LandingPage)
