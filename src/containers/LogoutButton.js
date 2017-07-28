import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { logout } from '../actions/authentication'
import { HOME } from '../routes'

const style = {
  marginTop: "15px",
  marginLeft: "10px",
  backgroundColor: "#e85600",
  border: "0px"
}

const LogoutButton = (props) => {
  return (
    <button onClick={props.logout} className="btn btn-lg btn-primary" style={style}>Logout</button>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout())
      .then(() => {
        ownProps.history.push(HOME)
      })
  }
})

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton))