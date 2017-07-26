import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Navbar />        
        <div className="container">
          <div className="">
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(ProfilePage)