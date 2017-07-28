import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'
import withSandbox from '../hocs/withSandbox'
import integrateLobby from '../hocs/integrateLobby'
import withChallenges from '../hocs/withChallenges'

import Editor from '../components/Editor'
import TestTable from '../components/TestTable'
import Challenges from '../components/challenges'
import Webcam from '../components/Webcam'
import ChallengeInfo from '../components/ChallengeInfo'
import RunIcon from '../components/run_icon.png'

import Confirmation from '../components/confirmBox';


class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.onRunClick = this.onRunClick.bind(this)
    this.showChallenges = this.showChallenges.bind(this)
    this.hideChallenges = this.hideChallenges.bind(this)
    this.state = {
      challengesVisibility: 'hide',
      activeModal: '',
      passed: true,
      resetVisiblity: '',
      confirm: false
    }
  }

  showChallenges() {
    this.setState({
      challengesVisibility: 'animated slideInRight visible',
      resetVisiblity: 'hide'
    })
  }

  hideChallenges() {
    this.setState({
      challengesVisibility: 'hide',
      resetVisiblity: ''
    })
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

  popupSubmit() {
    this.setState({
      activeModal: "active"
    }, () => {setTimeout(() => {this.setState({activeModal: ""})}, 1500)})
  }

  onRunClick(e) {
    this.props.sandboxEval(this.props.editorValue)
  }

  onResetClick() {
    this.setState({
      confirm: true
    }, () => {console.log("this.state in onResetClick: ", this.state)})
  }

  proceed() {
    this.props.onEditorChange(this.props.currentChallenge.initial_editor)
    this.setState({
      confirm: false,
    })
  }

  cancel() {
    this.setState({
      confirm: false
    })
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
          this.setState({
            passed: true
          }, this.popupSubmit)
          this.props.finishChallenge(this.props.currentChallenge.id, 1)
          this.props.updateLobbyChallenge({challengeId: this.props.currentChallenge.id, complete: true, editorState: this.props.editorValue})
        } else {
          this.evalMessageStyle = {
            color: 'red',
            float: 'right',
            marginRight: '40px'}
          this.evalMessage = "You passed: " + nextProps.sandboxResult.reduce((acc, el) => (el === true ? acc + 1 : acc), 0) + '/' + this.props.currentChallenge.input_output.length
          this.setState({
            passed: false
          }, this.popupSubmit)
          this.props.updateLobbyChallenge({challengeId: this.props.currentChallenge.id, editorState: this.props.editorValue})
        }
      } else {
        this.evalMessage = nextProps.sandboxResult
      }
    }
  }

  render() {
    const { stream: myStream, peerStream, sandboxResult, isUserMediaLoading } = this.props
    console.log(myStream, peerStream)
    return (
      <div className="columns col-gapless container">
          <div className="left-screen column col-lg-2" onClick={this.hideChallenges}>

            <ChallengeInfo
              currentChallenge={this.props.currentChallenge}
              sandboxResult={sandboxResult}
            />

            <div id="ErrorMessage" style={this.evalMessageStyle}>{this.evalMessage}</div>

            <Webcam
              isUserMediaLoading={isUserMediaLoading}
              myStream={myStream}
              peerStream={peerStream}
            />

          </div>

          <section className='editor-section column col-lg-8'>

            <div id="EditorBar" className="centered">
              <button id="ChallengeButton" className="btn" onClick={this.showChallenges}>CHALLENGES</button>
              <button id="RunButton" className="btn" onClick={this.onRunClick}><img id="RunIcon" src={RunIcon} /></button>
              <button id="ResetButton" className={"btn "+this.state.resetVisiblity} onClick={this.onResetClick.bind(this)}>RESET</button>
            </div>
            {this.state.confirm &&
              <Confirmation
                cancel={this.cancel.bind(this)}
                proceed={this.proceed.bind(this)}/>}

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
        <div className={"modal "+this.state.activeModal} style={this.state.passed ? {color: "green"} : {color: "red"}}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-header">
              <div  className="modal-title">{this.state.passed ? "Success!" : "Tests Failed"}</div>
            </div>
            <div className="modal-body">
              <div className="modal-content">
                {this.state.passed ?
                  <i className="icon icon-check"></i>
                  : <i className="icon icon-cross"></i>
                }
              </div>
            </div>
          </div>
        </div>

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
