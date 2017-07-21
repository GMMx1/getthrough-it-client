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
    this.setState({challengesVisibility: 'visible column col-lg-2 float-right'})
  }

  hideChallenges() {
    this.setState({challengesVisibility: 'hide'})
  }

  onChallengeClick(item) {
    console.log('item in onChallengeClick: ', item)
    if (item.complete === null) {
      this.props.onEditorChange(item.initial_editor)
      this.props.createNewChallenge({challengeId: item.id, editorState: item.initial_editor})
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
        this.props.updateChallenge({challengeId: this.props.currentChallenge.id, complete: this.props.currentChallenge.complete = true, editorState: this.props.editorValue})
      } else {
        this.evalMessage = nextProps.sandboxResult
      }
    }
  }

  render() {
    const { stream: myStream, peerStream, sandboxResult, isUserMediaLoading } = this.props
    return (
      <div className="lobby-page columns col-gapless">
          <div className="left-screen" onClick={this.hideChallenges}>
            <Webcam
              isUserMediaLoading={isUserMediaLoading}
              myStream={myStream}
              peerStream={peerStream}
            />
            <div className="test-suite">
              {!!this.props.currentChallenge &&
                <div>
                  <div style={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', textDecoration: 'underline'}}>{this.props.currentChallenge.name}:</div>
                  <div style={{fontSize: '20px', fontStyle: 'italic', textAlign: 'center'}}>{this.props.currentChallenge.question}</div>
                  <TestTable
                    tests={this.props.currentChallenge.input_output || []}
                    sandboxResult={sandboxResult || []} />
                  </div> }
                <div style={this.evalMessageStyle}>{this.evalMessage}</div>
            </div>
          </div>
          <section className='editor-section column col-lg-6' onClick={this.hideChallenges}>
            <Editor
              value={this.props.editorValue || ''}
              onChange={this.props.onEditorChange} />
          </section>

        <section className={this.state.challengesVisibility}>
          <Challenges
            challenges={this.props.challenges}
            onChallengeClick={this.onChallengeClick.bind(this)}
          />
        </section>
        <button className="btn" onClick={this.onRunClick}>Run</button>
        <button className="btn" onClick={this.showChallenges}>Challenges</button>
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
