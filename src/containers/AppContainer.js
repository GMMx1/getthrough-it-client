import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import App from '../components/App'

class AppContainer extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <App 

        />
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)