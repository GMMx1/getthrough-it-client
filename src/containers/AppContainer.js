import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import App from '../components/App'
import { checkAuthentication } from '../actions/authentication'

class AppContainer extends Component {
  componentDidMount() {
    this.props.checkAuthentication()
  }
  render() {
    return (
      <App/>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: () => {
      dispatch(checkAuthentication())
    }
  }
}

export default connect(null, mapDispatchToProps)(AppContainer)