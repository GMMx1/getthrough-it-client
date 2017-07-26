import React, { Component } from 'react'

import getDisplayName from '../utils/getDisplayName'
import { fget, fput, withHost } from '../utils/fetchHelper'
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
          call.on('close', (something) => {
            this.props.peer.connections = {}
            this.setState({
              peerStream: null
            })
          })
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
      console.log("peer on props: ", peer)

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
      var input_types = JSON.parse(item.input_type)
      for (var type=0; type<input_types.length; type++) {
        if (input_types[type] === "Array" || input_types[type] === "Object") {
          for (var i=0; i<item.input_output.length; i++) {
            if (typeof item.input_output[i][0][type] === "string" && input_types[type] !== "String") {
              item.input_output[i][0][type] = JSON.parse(item.input_output[i][0])
            }
          }
        }
      }
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
