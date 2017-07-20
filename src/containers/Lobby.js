import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'
import withSandbox from '../hocs/withSandbox'
import integrateLobby from '../hocs/integrateLobby'
import withChallenges from '../hocs/withChallenges'


import Video from '../components/Video'
import Editor from '../components/Editor'
import TestTable from '../components/TestTable'
import Challenges from '../components/challenges'

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

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  onChallengeClick(item) {
    console.log('item: ', item)
    if (item.complete === null) {
      this.props.onEditorChange(item.initial_editor)
      // this.props.createNewChallenge()
      // this.props.createNewChallenge
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
          this.evalMessage = "You passed: " + this.props.tests.length + '/' + this.props.tests.length
        } else {
          this.evalMessageStyle = {
            color: 'red',
            float: 'right',
            marginRight: '40px'}
          this.evalMessage = "You passed: " + nextProps.sandboxResult.reduce((acc, el) => (el === true ? acc + 1 : acc), 0) + '/' + this.props.tests.length
        }
      } else {
        this.evalMessage = nextProps.sandboxResult
      }
    }
  }

  renderComplete() {
    const { stream: myStream, peerStream, sandboxResult, tests } = this.props
    return (
      <div className="lobby-page columns col-gapless">
          <div className="left-screen" onClick={this.hideChallenges}>
            <section className="webcam-section">
              <div className="parent-webcam">
                <div className="myStream">
                  {myStream && <Video streamId={myStream.id} src={URL.createObjectURL(myStream)} muted={true}/>}
                </div>
                <div className="video-responsive video-responsive-4-3 waiting">
                  {peerStream ? <Video streamId={peerStream.id} src={URL.createObjectURL(peerStream)} muted={false}/> : <span>Waiting for Peer.</span>}
                </div>
              </div>
            </section>
            <div className="test-suite">
            <TestTable
              tests={tests}
              sandboxResult={sandboxResult || []} />
              <div style={this.evalMessageStyle}>{this.evalMessage}</div>
            </div>
          </div>
          <section className='editor-section column col-lg-6' onClick={this.hideChallenges}>
            <Editor
              value={this.props.editorValue || ''}
              onChange={this.props.onEditorChange} />
          </section>
        <div className={this.state.challengesVisibility}>
          <Challenges
            challenges={this.props.challenges}
            onChallengeClick={this.onChallengeClick.bind(this)}
          />
        </div>
        <button className="btn" onClick={this.onRunClick}>Run</button>
        <button className="btn" onClick={this.showChallenges}>Challenges</button>
      </div>
    )
  }

  render() {
    const { isUserMediaLoading } = this.props
    return isUserMediaLoading
      ? this.renderLoading()
      : this.renderComplete()
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
