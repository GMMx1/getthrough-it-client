import React, { Component } from 'react'

import getDisplayName from '../utils/getDisplayName'
import { fget, fput } from '../utils/fetchHelper'
import withHost from '../utils/withHost'
import { NULL_ID, SAME_ID, DIFF_ID, testPeerId } from '../utils/testPeer'

import { lobby as lobbyUrl } from '../routes'

const integrateLobby = (WrappedComponent) => {
  class IntegrateLobby extends Component {
    constructor(props) {
      super(props)
      this.state = {
        peerStream: null,
        connection: null,
        sendEditorStateOnUnload: true,
        currentChallenge: false
      }

      this.pageCleanup = this.pageCleanup.bind(this)
      this.onOpen = this.onOpen.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
    }
    pageCleanup() {
      if (this.state.sendEditorStateOnUnload) {
        fetch(withHost(lobbyUrl(this.props.lobbyId)), fput({ editorState: this.state.editorValue }))
        this.setState({ sendEditorStateOnUnload: false })
      }
    }
    componentDidMount() {
      window.onbeforeunload = this.pageCleanup
      window.onunload = this.pageCleanup
    }
    componentDidUpdate(prevProps) {
      if (!prevProps.peer && this.props.peer) {
        this.props.peer.on('open', this.onOpen)
        this.props.peer.on('call', (call) => {
          call.answer(this.props.stream)
          call.on('stream', (peerStream) => this.setState({ peerStream }))
        })
        this.props.peer.on('connection', (connection) => {
          this.setState({ connection }, () => {
            connection.on('data', (data) => this.setState(data))
          })
        })
      }
    }
    async onOpen() {
      const { peer, stream } = this.props
      const response = await fetch(withHost(lobbyUrl(this.props.lobbyId)), fget())
      const lobby = await response.json()
      const [peerId, myId] = [lobby.peerId, this.props.userId]

      this.setState({ editorValue: lobby.editorState })

      switch(testPeerId(peerId, myId)) {
        case NULL_ID:
          console.log('NULL ID')
          break
        case SAME_ID:
          console.log('SAME ID')
          break
        case DIFF_ID:
          const call = peer.call(`${peerId}${lobby.url}`, stream)
          const conn = peer.connect(`${peerId}${lobby.url}`)
          this.setState({ connection: conn }, () => {
            call.on('stream', (peerStream) => this.setState({ peerStream }))
            conn.on('data', (data) => this.setState(data))
          })
          break
        default:
          break
      }
    }

    onChallengeChange(item) {
      this.setState({
        currentChallenge: item
      })
    }

    onEditorChange(newValue) {
      this.setState({ editorValue: newValue }, () => {
        this.state.connection &&
        this.state.connection.send({ editorValue: newValue })
      })
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onEditorChange={this.onEditorChange}
          onChallengeChange={this.onChallengeChange.bind(this)}
        />
      )
    }
  }
  IntegrateLobby.displayName = `IntegrateLobby(${getDisplayName(WrappedComponent)})`
  return IntegrateLobby
}

export default integrateLobby
