import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'
import withSandbox from '../hocs/withSandbox'
import integrateLobby from '../hocs/integrateLobby'

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

    this.onClose = this.onClose.bind(this)

    this.onEditorChange = this.onEditorChange.bind(this)
    this.onRunClick = this.onRunClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.peer) {
      nextProps.peer.on('open', this.onOpen)
      nextProps.peer.on('call', this.onCall)
      nextProps.peer.on('connection', this.onConnection)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.peerId && this.props.peerId) {
      this.onOpen()
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
    console.log('this.props.peerId in onOpen Lobby.js: ', this.props.peerId)
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
    call.on('close', this.onClose)
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
    connection.on('close', this.onClose)
  }

  onData(data) {
    console.log(`onData: ${data}`)
    this.setState(data)
  }


  // not currently used
  onDisconnect() {
    console.log('in onDisconnect')
  }

  onClose() {
    if (this.props.peer.connections[this.props.peerId]) {
      delete this.props.peer.connections[this.props.peerId];
      this.setState({
        peerStream: undefined,
        connection: undefined
      })
    }
  }

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  onEditorChange(newValue) {
    this.setState({ editorValue: newValue }, () => {
      this.state.connection &&
      this.state.connection.send({ editorValue: newValue })
    })
  }

  onRunClick(e) {
    this.props.sandboxEval(this.state.editorValue)
  }

  renderComplete(myStream, peerStream) {
    return (
      <div className="lobby-page">
        <div className="left-screen">
          <section className="webcam-section">
            <div className="parent-webcam">
              <div className="myStream">
                {myStream && <Video streamId={myStream.id} src={URL.createObjectURL(myStream)} muted={true}/>}
              </div>
              {peerStream && <Video streamId={peerStream.id} src={URL.createObjectURL(peerStream)} muted={false}/> || <div className="waiting img-responsive">waiting for peer</div>}
            </div>
          </section>
          <section className="test-suite "></section>
        </div>
        <section className='editor-section' >
          <Editor
            value={this.state.editorValue}
            onChange={this.onEditorChange}
          />
          <button
            onClick={this.onRunClick}
          >
            Run
          </button>
        </section>
      </div>
    )
  }

  render() {
    const { peer, stream, error, isUserMediaLoading, peerId } = this.props
    const { peerStream } = this.state
    console.log('this.props in render: ', this.props)
    return isUserMediaLoading
      ? this.renderLoading()
      : this.renderComplete(stream, peerStream)
  }
}

Lobby.propTypes = {
  id: PropTypes.string,
  peer: PropTypes.object,
  stream: PropTypes.object,
  error: PropTypes.object,
  isUserMediaLoading: PropTypes.bool,
  peerId: PropTypes.string,
}

export default connect()(withUserMedia(withSandbox(integrateLobby(Lobby))))
