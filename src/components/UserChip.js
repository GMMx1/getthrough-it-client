import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { PROFILE } from '../routes'

const style = {
  parent: {
    background: 'none',
    color: '#fafafa'
  },
  displayName: {
    marginRight: '1em'
  }
}

class UserChip extends PureComponent {
  render() {
    const { photo_url, display_name } = this.props

    return (
      <Link 
        to={PROFILE} 
        className="chip lighter" 
        style={style.parent} 
      >
        <span style={style.displayName}>{display_name}</span>
        <img src={photo_url} className="avatar avatar-sm" />
      </Link>
    )
  }
}

UserChip.propTypes = {
  photo_url: PropTypes.string.isRequired,
  display_name: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

UserChip.defaultProps = {
  onClick: () => {}
}

export default UserChip
