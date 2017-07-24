import React, { Component } from 'react'
import Peer from 'peerjs'

import getDisplayName from '../utils/getDisplayName'
import { PROTOCOL, HOST, PORT, SECURE } from '../config'

const getCredentials = () => (
  fetch('https://global.xirsys.net/_turn/satellitepunch/', { 
    method: 'PUT',
    headers: {
      Authorization: `Basic ${btoa('juangab:c3227988-6286-11e7-b5b5-776b4c132c85')}`
    }
  }).then((res) => { return res.json() })
)

const getUserMedia = () => (
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
)

const peerConfig = (iceServers) => ({ 
  host: `${HOST}`,
  port: PORT,
  secure: SECURE,
  path: '/peerjs',
  config: { iceServers }
})

const withUserMedia = (WrappedComponent) => {
  class WithUserMedia extends Component {
    constructor(props) {
      super(props)
      this.state = {
        peer: null,
        stream: null,
        error: undefined,
        isUserMediaLoading: true,
        userId: null
      }
    }
    async componentDidMount() {
      try {
        const userId = localStorage.getItem('userId') || Date.now()
        localStorage.setItem('userId', userId)
        
        const [res, stream] = await Promise.all([getCredentials(), getUserMedia()])
        const peer = new Peer(`${userId}${this.props.lobbyId}`,peerConfig(res.v.iceServers))

        this.setState({ stream, peer, userId, isUserMediaLoading: false })
      } catch (error) {
        this.setState({ error, isUserMediaLoading: false })
      }
    }
    render() {
      return (
        <WrappedComponent 
          peer={this.state.peer}
          stream={this.state.stream}
          error={this.state.error}
          isUserMediaLoading={this.state.isUserMediaLoading}
          userId={this.state.userId}
          {...this.props} 
        />
      )
    }
  }
  WithUserMedia.displayName = `WithUserMedia(${getDisplayName(WrappedComponent)})`
  return WithUserMedia
}

export default withUserMedia