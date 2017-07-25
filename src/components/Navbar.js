import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withHost, withQuery } from '../utils/fetchHelper'
import { AUTH_GITHUB } from '../routes'

class Navbar extends Component {
  render() {
    return (
      <header className="navbar nav-default">
      <section className="navbar-section">
        <a href="#" className="navbar-brand">GET_THROUGH_IT</a>
      </section>
      <section className="navbar-section">
        <a href={withHost(AUTH_GITHUB)} className="btn">login with github</a>
      </section>
      </header>
    )
  }
}

export default Navbar
