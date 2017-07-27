import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createLobby } from '../actions/lobbies'
import { lobby as lobbyUrl } from '../routes'

class CreateLobby extends Component {
  render() {
    return (
      <button
        id="create-lobby"
        className="btn centered text-bold" 
        onClick={this.props.onClick}>
        CREATE NEW LOBBY
      </button>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(createLobby())
      .then((lobby) => {
        ownProps.history.push(lobbyUrl(lobby.url))
      })
  }
})

export default connect(null, mapDispatchToProps)(CreateLobby)
