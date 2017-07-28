import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import JoinedLobbies from '../../containers/JoinedLobbies'
import LogoutButton from '../../containers/LogoutButton'
import { getUserLobbies } from '../../actions/lobbies'
import Navbar from '../Navbar'
import Footer from '../Footer'

const style = {
  maxWidth: '800px'
}

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getUserLobbies = this.getUserLobbies.bind(this)
  }
  componentDidMount() {
    if (this.props.user) {
      this.getUserLobbies(this.props.user.id)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.getUserLobbies(nextProps.user.id)
    } 
  }
  getUserLobbies(userId) {
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.props
        .getUserLobbies(userId)
        .then(lobbies => {
          this.setState({ lobbies, isLoading: false })
        })
    }, 1000)
  }
  render() {
    const isLoading = this.props.isLoading || this.state.isLoading
    const { photo_url, display_name } = this.props.user || {}
    
    return (
      <div className="profile-page">
        <Navbar />        
        <div className="container" style={style}>
          <JoinedLobbies
            isLoading={isLoading}
            lobbies={this.state.lobbies} />
          <LogoutButton />
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

const mapDispatchToProps = (dispatch) => ({
  getUserLobbies: (userId) => dispatch(getUserLobbies(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))

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