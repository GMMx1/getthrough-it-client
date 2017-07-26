import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withHost, fget, fput, fpost } from '../utils/fetchHelper'
import getDisplayName from '../utils/getDisplayName'
import { lobbyChallenges } from '../routes'


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
      const res = await fetch(withHost(lobbyChallenges(this.props.lobbyId)), fget())
      const challenges = await res.json()
      console.log('challenges: ', challenges)
      this.setState({
        challenges: challenges
      })
    }

    updateLobbyChallenge(body) {
      fetch(withHost(lobbyChallenges(this.props.lobbyId)), fput(body))
    }

    createNewLobbyChallenge(body) {
      fetch(withHost(lobbyChallenges(this.props.lobbyId)), fpost(body))
    }

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
