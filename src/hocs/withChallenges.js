import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fget, fput, fpost } from '../utils/fetchHelper'
import getDisplayName from '../utils/getDisplayName'


const withChallenges = (WrappedComponent) => {
  class WithChallenges extends Component {
    constructor(props) {
      super(props)
      this.state = {
        challenges: []
      }
    }

    componentDidMount() {
      this.getChallenges()
      console.log('this.props in withChallenges: ', this.props)

    }

    async getChallenges() {
      const res = await fetch(`http://localhost:8000/v1/lobbies/${this.props.lobbyId}/challenges`, fget())
      const challenges = await res.json()
      console.log('challenges: ', challenges)
      this.setState({
        challenges: challenges
      })
    }

    updateLobbyChallenge(body) {
      fetch(`http://localhost:8000/v1/lobbies/${this.props.lobbyId}/challenges`, fput(body))
    }

    createNewLobbyChallenge(body) {
      fetch(`http://localhost:8000/v1/lobbies/${this.props.lobbyId}/challenges`, fpost(body))
    }



    // actions needed:
      // get all challenges
      // get all lobby challenge data (may want to grab editorData in separate request)
      // post new lobby-challenge on click for specific challenge in a lobby
      // update existing lobby-challenge

    // state needed:
      // currentChallenge: (your current or choosing a challenge)

    // need all challenges but not on state


    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          updateLobbyChallenge={this.updateLobbyChallenge.bind(this)}
          createNewLobbyChallenge={this.createNewLobbyChallenge.bind(this)}
          getChallenges={this.getChallenges}
        />
      )
    }
  }
  WithChallenges.displayName = `WithChallenges(${getDisplayName(WrappedComponent)})`
  return WithChallenges
}

export default withChallenges
