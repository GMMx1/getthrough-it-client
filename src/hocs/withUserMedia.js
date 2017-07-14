import React, { Component } from 'react'
import Peer from 'peerjs'
import getDisplayName from '../utils/getDisplayName'

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
  host: 'secure-island-39467.herokuapp.com',
  port: 443,
  debug: 3,
  secure: true,
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
      }
    }
    async componentDidMount() {
      try {
        const [res, stream] = await Promise.all([getCredentials(), getUserMedia()])
        const peer = new Peer(peerConfig(res.v.iceServers))
        this.setState({ stream, peer, isUserMediaLoading: false })
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
          {...this.props} 
        />
      )
    }
  }
  WithUserMedia.displayName = `WithUserMedia(${getDisplayName(WrappedComponent)})`
  return WithUserMedia
}

export default withUserMedia