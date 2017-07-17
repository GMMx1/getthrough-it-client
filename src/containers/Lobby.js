import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'
import withSandbox from '../hocs/withSandbox'
import integrateLobby from '../hocs/integrateLobby'

import Video from '../components/Video'
import Editor from '../components/Editor'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.onRunClick = this.onRunClick.bind(this)
  }
  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }


  onChallengeClick() {
    // write function for if someone clicks on specific challenge
    
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
  renderComplete(myStream, peerStream) {
    return (
      <div className="lobby-page">
        <div className="left-screen">
          <section className="webcam-section">
            <div className="parent-webcam">
              <div className="myStream">
                {myStream && <Video streamId={myStream.id} src={URL.createObjectURL(myStream)} muted={true}/>}
              </div>
              {peerStream 
                ? <Video streamId={peerStream.id} src={URL.createObjectURL(peerStream)} muted={false}/> 
                : <div className="waiting img-responsive">waiting for peer</div>}
            </div>
          </section>
          <section className="test-suite "></section>
        </div>
        <section className='editor-section' >
          <Editor
            value={this.props.editorValue}
            onChange={this.props.onEditorChange}
          />
          <button
            onClick={this.onRunClick}
          >
            Run
          </button>
        </section>
      </div>
    )
  }

  render() {
    const { stream, isUserMediaLoading, peerStream } = this.props
    return isUserMediaLoading
      ? this.renderLoading()
      : this.renderComplete(stream, peerStream)
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

export default connect()(withUserMedia(integrateLobby(withSandbox(Lobby))))
