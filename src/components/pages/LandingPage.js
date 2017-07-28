import React from 'react'
import { withRouter } from 'react-router-dom'

import CreateLobby from '../../components/CreateLobby'
import Navbar from '../../components/Navbar'

const LandingPage = (props) => {
  return (
    <div id="landingPage">
      <Navbar />
      <div id="landingPageGif" />
      <div id="landingPage_description" className="text-center">
        <h2 className=" text-bold">GET_THROUGH_IT</h2>
        <p>A modern online collaborative text editor.</p>
      </div>
      <CreateLobby
        history={props.history} />
    </div>
  )
}

export default withRouter(LandingPage)
