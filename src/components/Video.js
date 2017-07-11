import React, { PureComponent } from 'react'

class Video extends PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <video 
        src={this.props.src}
        autoPlay={this.props.autoplay || true} />
    )
  }
}

export default Video