import React, { Component } from 'react'
import { connect } from 'react-redux'

import getDisplayName from '../utils/getDisplayName'
import { fget, fput, withHost } from '../utils/fetchHelper'
import { NULL_ID, SAME_ID, DIFF_ID, testPeerId } from '../utils/testPeer'
import { lobby as lobbyUrl , lobbyChallenges } from '../routes'
import { associateUserToLobby } from '../actions/lobbies'

const integrateLobby = (WrappedComponent) => {
  class IntegrateLobby extends Component {
    constructor(props) {
      super(props)
      this.state = {
        peerStream: null,
        connection: null,
        call: null,
        sendEditorStateOnUnload: true,
        currentChallenge: false,
        challenges: []
      }

      this.pageCleanup = this.pageCleanup.bind(this)
      this.onOpen = this.onOpen.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
      this.onClose = this.onClose.bind(this)
    }

    componentWillUnmount() {
      this.state.connection && this.state.connection.close()
      this.state.call && this.state.call.close()
      this.props.stream && this.props.stream.getTracks().forEach(x => x.stop())
      this.props.peer && this.props.peer.disconnect()
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
      this.getChallenges()
    }

    componentWillUpdate(nextProps) {
      if (nextProps.user) {
        this.props.dispatch(associateUserToLobby(nextProps.user.id, nextProps.lobbyId))
      }
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.peer && this.props.peer) {
        this.props.peer.on('open', this.onOpen)
        this.props.peer.on('call', (call) => {
          this.setState({ call }, () => {
            call.answer(this.props.stream)
            call.on('stream', (peerStream) => this.setState({ peerStream }))
            call.on('close', () => { this.onClose(call) })
          })
        })
        this.props.peer.on('connection', (connection) => {
          this.setState({ connection }, () => {
            connection.on('data', (data) => this.setState(data))
          })
        })
      }
    }

    onClose(call) {
      this.props.peer.connections = {}
      this.setState({
        peerStream: null
      }, () => { call.answer(this.props.stream) })
    }

    async onOpen() {
      const { peer, stream } = this.props
      const response = await fetch(withHost(lobbyUrl(this.props.lobbyId)), fget())
      const lobby = await response.json()
      const [peerId1, peerId2, myId] = [lobby.peerId1, lobby.peerId2, this.props.userId]
      const peerId = myId === peerId1 ? peerId2 : peerId1
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
            call.on('close', () => { this.onClose(call) })
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
      this.setState({ currentChallenge: item }, () => {
        this.state.connection &&
        this.state.connection.send({ currentChallenge: item })
      })
    }

    onEditorChange(newValue) {
      this.setState({ editorValue: newValue }, () => {
        this.state.connection &&
        this.state.connection.send({ editorValue: newValue })
      })
    }

    async getChallenges() {
      const res = await fetch(withHost(lobbyChallenges(this.props.lobbyId)), fget())
      const challenges = await res.json()
      console.log('challenges: ', challenges)
      this.setState({
        challenges: challenges
      })
    }

    finishChallenge(challengeId, pass) {
      var newChallenge;
      for (var i = 0; i < this.state.challenges.length; i++) {
        if (this.state.challenges[i].id === challengeId) {
          newChallenge = {...this.state.challenges[i], complete: 1}
          this.setState({
            challenges: this.state.challenges.slice(0,i).concat(newChallenge).concat(this.state.challenges.slice(i+1))
          }, () => {
            this.state.connection &&
            this.state.connection.send({
              challenges: this.state.challenges
            })
          })
        }
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onEditorChange={this.onEditorChange}
          onChallengeChange={this.onChallengeChange.bind(this)}
          finishChallenge={this.finishChallenge.bind(this)}
        />
      )
    }
  }
  IntegrateLobby.displayName = `IntegrateLobby(${getDisplayName(WrappedComponent)})`
  return connect()(IntegrateLobby)
}

export default integrateLobby
