import React, { Component } from 'react'

class Video extends Component {
  render() {
    return (
      <video 
        src={this.props.src}
        autoPlay={this.props.autoplay || true} />
    )
  }
}

export default Video