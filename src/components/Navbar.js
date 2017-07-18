import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <header className="navbar nav-default">
      <section className="navbar-section">
        <a href="#" className="navbar-brand">GET_THROUGH_IT</a>
      </section>
      <section className="navbar-section">
        <a href="#" className="btn">login with github</a>
      </section>
      </header>
    )
  }
}

export default Navbar
