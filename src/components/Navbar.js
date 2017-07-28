import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Logo from './getthroughit_logo.jpg'
import UserNavLink from '../containers/UserNavLink'
import { HOME } from '../routes'

class Navbar extends Component {
  render() {
    return (
      <header className="navbar nav-default">
      <Link to={HOME} className="navbar-section App-logo">
        <img className="navbar-brand" src={Logo} />
      </Link>
      <UserNavLink />
      </header>
    )
  }
}

export default Navbar
