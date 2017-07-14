import React, { Component } from 'react'

import getDisplayName from '../utils/getDisplayName'
import { fput } from '../utils/fetchHelper'

const integrateLobby = (WrappedComponent) => {
  class IntegrateLobby extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.onOpen = this.onOpen.bind(this)
      this.onError = this.onError.bind(this)
    }
    // async componentDidMount() {
    //   console.log(this.props)
    //   const lobbyUrl = `http://localhost:8000/v1/lobbies/${this.props.id}`
    //   const response = await fetch(lobbyUrl)
    //   const lobby = await response.json()
    //   if (!lobby.peerId) {
    //     console.log("LOL")
    //     // const response = await fetch(lobbyUrl, fput({  }))
    //   }
    // }
    componentWillReceiveProps(nextProps) {
      if (!this.props.peer) {
        nextProps.peer.on('open', this.onOpen)
        nextProps.peer.on('error', this.onError)
      }
    }
    async onOpen(peerId) {
      console.log('ON OPEN IntegrateLobby', peerId)
      const lobbyUrl = `http://localhost:8000/v1/lobbies/${this.props.id}`
      const response = await fetch(lobbyUrl)
      const lobby = await response.json()

      if (!lobby.peerId) {
        // 
        console.log("WITHOUT PEERID")
        const response = await fetch(lobbyUrl, fput({ peerId }))
      } else {
        console.log("WITH PEERID", lobby.peerId)
        this.setState({ peerId: lobby.peerId })
      }
    }
    onError(err) {
      console.log('ON ERROR IntegrateLobby: ', err)
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          peerId={this.state.peerId}
        />
      )
    }
  }
  IntegrateLobby.displayName = `IntegrateLobby(${getDisplayName(WrappedComponent)})`
  return IntegrateLobby
}

export default integrateLobby