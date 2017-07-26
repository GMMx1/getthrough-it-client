import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserNavLink from '../containers/UserNavLink'

class Navbar extends Component {
  render() {
    return (
      <header className="navbar nav-default">
      <section className="navbar-section">
        <a href="#" className="navbar-brand">GET_THROUGH_IT</a>
      </section>
      <UserNavLink />
      </header>
    )
  }
}

export default Navbar
