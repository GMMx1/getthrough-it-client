import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'
import withSandbox from '../hocs/withSandbox'
import integrateLobby from '../hocs/integrateLobby'
import withChallenges from '../hocs/withChallenges'


// import Video from '../components/Video'
import Editor from '../components/Editor'
import TestTable from '../components/TestTable'
import Challenges from '../components/challenges'
import Webcam from '../components/webcam'
import ChallengeInfo from '../components/ChallengeInfo'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.onRunClick = this.onRunClick.bind(this)
    this.showChallenges = this.showChallenges.bind(this)
    this.hideChallenges = this.hideChallenges.bind(this)
    this.state = {
      challengesVisibility: 'hide'
    }
  }

  showChallenges() {
    this.setState({challengesVisibility: 'animated slideInRight visible'})
  }

  hideChallenges() {
    this.setState({challengesVisibility: 'hide'})
  }

  onChallengeClick(item) {
    console.log('item in onChallengeClick: ', item)
    if (item.complete === null) {
      this.props.onEditorChange(item.initial_editor)
      this.props.createNewLobbyChallenge({challengeId: item.id, editorState: item.initial_editor})
    } else {
      this.props.onEditorChange(item.editorState)
    }
    this.props.onChallengeChange(item)
  }



  onEditorChange(newValue) {
    this.setState({ editorValue: newValue }, () => {
      this.state.connection &&
      this.state.connection.send({ editorValue: newValue })
    })
  }

  onRunClick(e) {
    this.props.sandboxEval(this.props.editorValue)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sandboxResult !== this.props.sandboxResult) {
      this.evalMessageStyle = {color: 'red'}
      this.evalMessage = ''
      if (Array.isArray(nextProps.sandboxResult)) {
        if (nextProps.sandboxResult.every((el) => el === true)) {
          this.evalMessageStyle = {
            color: 'green',
            float: 'right',
            marginRight: '40px'}
          this.evalMessage = "You passed: " + this.props.currentChallenge.input_output.length + '/' + this.props.currentChallenge.input_output.length
          this.props.currentChallenge.complete = true
        } else {
          this.evalMessageStyle = {
            color: 'red',
            float: 'right',
            marginRight: '40px'}
          this.evalMessage = "You passed: " + nextProps.sandboxResult.reduce((acc, el) => (el === true ? acc + 1 : acc), 0) + '/' + this.props.currentChallenge.input_output.length
          this.props.currentChallenge.complete = false
        }
        this.props.updateLobbyChallenge({challengeId: this.props.currentChallenge.id, complete: this.props.currentChallenge.complete = true, editorState: this.props.editorValue})
      } else {
        this.evalMessage = nextProps.sandboxResult
      }
    }
  }

  render() {
    const { stream: myStream, peerStream, sandboxResult, isUserMediaLoading } = this.props
    return (
      <div className="columns col-gapless container">
          <div className="left-screen column col-lg-2" onClick={this.hideChallenges}>

            <div id="ErrorMessage" style={this.evalMessageStyle}>{this.evalMessage}</div>

            <ChallengeInfo
              currentChallenge={this.props.currentChallenge}
              sandboxResult={sandboxResult}
            />

            <Webcam
              isUserMediaLoading={isUserMediaLoading}
              myStream={myStream}
              peerStream={peerStream}
            />

          </div>

          <section className='editor-section column col-lg-8'>

            <div id="EditorBar" className="centered">
              <button id="ChallengeButton" className="btn" onClick={this.showChallenges}>CHALLENGES</button>
              <button id="RunButton" className="btn" onClick={this.onRunClick}>RUN</button>
            </div>

            <div onClick={this.hideChallenges}>
              <Editor
                value={this.props.editorValue || ''}
                onChange={this.props.onEditorChange}
              />
            </div>
          </section>

        <section id="ChallengePanel" className={this.state.challengesVisibility}>
          <Challenges
            challenges={this.props.challenges}
            onChallengeClick={this.onChallengeClick.bind(this)}
          />
        </section>

      </div>
    )
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

export default connect()(withChallenges(withUserMedia(integrateLobby(withSandbox(Lobby)))))
