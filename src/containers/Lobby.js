import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'

import Video from '../components/Video'
import Editor from '../components/Editor'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editorValue: '//code here!'
    }

    this.onOpen = this.onOpen.bind(this)
    this.onCall = this.onCall.bind(this)
    this.onData = this.onData.bind(this)
    this.setPeerStream = this.setPeerStream.bind(this)
    this.onConnection = this.onConnection.bind(this)
    this.setConnection = this.setConnection.bind(this)
    
    this.onEditorChange = this.onEditorChange.bind(this)
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

  onOpen(data) {
    console.log(`onOpen: ${data}`)
    const { peerId, peer, stream } = this.props
    if (this.props.peerId) {
      const call = peer.call(peerId, stream)
      const conn = peer.connect(peerId)
      call.on('stream', this.setPeerStream)
      conn.on('open', this.setConnection.bind(this, conn))
      conn.on('data', this.onData)
      conn.on('error', console.error)
    }
  }

  onCall(call) {
    console.log("GETS HERE")
    call.answer(this.props.stream)
    call.on('stream', this.setPeerStream)
  }

  onConnection(connection) {
    console.log(`onConnection: ${connection}`)
    this.setState({ connection })
    connection.on('data', this.onData)
  }

  setPeerStream(peerStream) {
    console.log(`setPeerStream: ${peerStream}`)
    this.setState({ peerStream })
  }

  setConnection(connection) {
    console.log(`setConnection: ${connection}`)
    this.setState({ connection })
  }

  onData(data) {
    console.log(`onData: ${data}`)
    this.setState(data)
  }

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  onEditorChange(newValue) {
    this.setState({ editorValue: newValue }, () => {
      console.log('STATE HERE', this.state.connection)
      this.state.connection.send({ editorValue: newValue })
    })
  }

  renderComplete(myStream, peerStream) {
    return (
      <div>
        {myStream && <Video src={URL.createObjectURL(myStream)}/>}
        {peerStream && <Video src={URL.createObjectURL(peerStream)}/>}
        <Editor 
          value={this.state.editorValue}
          onChange={this.onEditorChange}
        />
      </div>
    )
  }

  render() {
    const { peer, stream, error, isUserMediaLoading, peerId } = this.props
    const { peerStream } = this.state
    console.log(peer, stream, error, isUserMediaLoading, peerId)
    return isUserMediaLoading 
      ? this.renderLoading() 
      : this.renderComplete(stream, peerStream)
  }
}

Lobby.propTypes = {
  id: PropTypes.number,
  peer: PropTypes.object,
  stream: PropTypes.object,
  error: PropTypes.object,
  isUserMediaLoading: PropTypes.bool,
  peerId: PropTypes.string,
}

export default connect()(withUserMedia(Lobby))