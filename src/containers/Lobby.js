import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'

import Video from '../components/Video'
import Editor from '../components/Editor'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.onOpen = this.onOpen.bind(this)
    this.onCall = this.onCall.bind(this)
    this.onConnection = this.onConnection.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.peer) {
      nextProps.peer.on('open', this.onOpen)
      nextProps.peer.on('call', this.onCall)
      nextProps.peer.on('connection', this.onConnection)
    }
  }

  componentWillUnmount() {
    this.props.peer.off('open', this.onOpen)
    this.props.peer.off('call', this.onCall)
    this.props.peer.off('connection', this.onConnection)
  }

  onOpen() {
    // POST to lobby set peerId1 to stuff
    
  }

  onCall() {

  }

  onConnection() {

  }

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  renderComplete(stream) {
    return (
      <div>
        <Video src={URL.createObjectURL(stream)}/>
        <Editor />
      </div>
    )
  }

  render() {
    const { peer, stream, error, isUserMediaLoading } = this.props
    console.log(peer, stream, error, isUserMediaLoading)
    return isUserMediaLoading 
      ? this.renderLoading() 
      : this.renderComplete(stream)
  }
}

Lobby.propTypes = {
  id: PropTypes.number,
  peer: PropTypes.object,
  stream: PropTypes.object,
  error: PropTypes.object,
  isUserMediaLoading: PropTypes.bool
}

export default connect()(withUserMedia(Lobby))