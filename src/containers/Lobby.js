import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import withUserMedia from '../hocs/withUserMedia'

import Video from '../components/Video'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  renderComplete(stream) {
    return (
      <Video src={URL.createObjectURL(stream)}/>
    )
  }

  render() {
    const { peer, stream, error, isUserMediaLoading } = this.props
    console.log(peer, stream, error, isUserMediaLoading)
    return isUserMediaLoading 
      ? this.renderLoading() 
      : this.renderComplete(stream)
  }
}

Lobby.propTypes = {
  id: PropTypes.number,
  peer: PropTypes.object,
  stream: PropTypes.object,
  error: PropTypes.object,
  isUserMediaLoading: PropTypes.bool
}

export default connect()(withUserMedia(Lobby))