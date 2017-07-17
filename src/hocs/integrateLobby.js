import React, { Component } from 'react'

import getDisplayName from '../utils/getDisplayName'
import { fget } from '../utils/fetchHelper'
import {  NULL_ID, SAME_ID, DIFF_ID, testPeerId } from '../utils/testPeer'

const integrateLobby = (WrappedComponent) => {
  class IntegrateLobby extends Component {
    constructor(props) {
      super(props)
      this.state = {
        editorValue: '',
        peerStream: null,
        connection: null
      }

      this.onOpen = this.onOpen.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
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
    async onOpen(id) {
      const { peer, stream } = this.props
      const lobbyUrl = `http://localhost:8000/v1/lobbies/${this.props.lobbyId}`
      const response = await fetch(lobbyUrl, fget())
      const lobby = await response.json()
      const [peerId, myId] = [lobby.peerId, this.props.userId]

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
            conn.on('error', console.error)
          })
          break
        default: 
          break
      }
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
        />
      )
    }
  }
  IntegrateLobby.displayName = `IntegrateLobby(${getDisplayName(WrappedComponent)})`
  return IntegrateLobby
}

export default integrateLobby