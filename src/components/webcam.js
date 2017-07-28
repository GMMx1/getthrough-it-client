import React, { PureComponent } from 'react'

import Video from '../components/Video'


class Webcam extends PureComponent {
  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  renderComplete() {
    const { myStream, peerStream } = this.props

    return (
      <section className="webcam-section">
        {console.log('myStream: ', myStream)}
        <div className="parent-webcam">
          <div className="myStream">
            {myStream && <Video streamId={myStream.id} src={URL.createObjectURL(myStream)} muted={true}/>}
          </div>
          <div className="video-responsive video-responsive-4-3 waiting">
            {peerStream ? <Video streamId={peerStream.id} src={URL.createObjectURL(peerStream)} muted={false}/> : <span>Waiting for Peer.</span>}
          </div>
        </div>
      </section>
    )
  }

  render() {
    const { isUserMediaLoading } = this.props
    return isUserMediaLoading
      ? this.renderLoading()
      : this.renderComplete()
  }
}

export default Webcam
