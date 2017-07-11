import React, { PureComponent } from 'react'

class Video extends PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <video
        src={this.props.src}
        autoPlay={this.props.autoplay || true}
        muted={this.props.muted}/>
    )
  }
}

export default Video
