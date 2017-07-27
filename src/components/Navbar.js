import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Logo from './getthroughit_logo.jpg'
import UserNavLink from '../containers/UserNavLink'

class Navbar extends Component {
  render() {
    return (
      <header className="navbar nav-default">
      <section className="navbar-section">
        <img className="navbar-brand" src={Logo} />
      </section>
      <UserNavLink />
      </header>
    )
  }
}

export default Navbar
