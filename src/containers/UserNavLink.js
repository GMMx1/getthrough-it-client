import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions/authentication'
import { withHost, withQuery } from '../utils/fetchHelper'
import { AUTH_GITHUB } from '../routes'

import UserChip from '../components/UserChip'

class UserNavLink extends Component {
  render() {
    const { isLoggedIn, user, logout } = this.props
    return (
      <section className="navbar-section">
        {isLoggedIn
          ? <UserChip onClick={logout} {...user}/>
          : <a href={withHost(AUTH_GITHUB)} className="btn">login with github</a>}
      </section>
      
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.user,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNavLink)