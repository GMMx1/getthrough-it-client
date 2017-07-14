import React, { Component } from 'react'

class Video extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.streamId !== nextProps.streamId
  }

  render() {
    return (
      <video
        className="img-responsive"
        src={this.props.src}
        autoPlay={this.props.autoplay || true}
        muted={this.props.muted}/>
    )
  }
}

export default Video
