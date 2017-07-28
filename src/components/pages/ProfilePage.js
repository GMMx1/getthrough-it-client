import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CompletedChallenges from '../../containers/CompletedChallenges'
import Navbar from '../Navbar'
import Footer from '../Footer'

const style = {
  maxWidth: '800px',
  height: window.innerHeight - 40
}

class ProfilePage extends Component {
  render() {
    const isLoading = this.props.isLoading
    const { photo_url, display_name } = this.props.user || {}
    
    return isLoading ? <span>Loading...</span> : (
      <div className="profile-page">
        <Navbar />        
        <div className="container" style={style}>
          <div className="profile-header">
            <h3 className="profile-header-title">Completed Challenges</h3>
          </div>
          <div className="columns">
            <div className="column col-12">
            </div>
          </div>
          <CompletedChallenges />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading
})

export default withRouter(connect(mapStateToProps)(ProfilePage))

const a = ({photo_url, display_name}) => [
  <div className="column col-4">
    {photo_url && (
      <figure className="avatar">
        <img src={photo_url} />
      </figure>
    )}
  </div>,
  <div className="column col-8">
    {display_name && <h3><b>{display_name}</b></h3>}
  </div>
]