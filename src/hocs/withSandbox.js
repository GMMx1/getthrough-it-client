import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getDisplayName from '../utils/getDisplayName'

const style = {
  display: 'none'
}

const withSandbox = (WrappedComponent) => {
  class WithSandbox extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.sandboxEval = this.sandboxEval.bind(this)
    }

    componentDidMount() {
      window.addEventListener('message', this.sandboxResultListener.bind(this))
    }

    sandboxResultListener(e) {
      if (e.origin === 'null' && e.source === this.frame.contentWindow)
        this.setState({ sandboxResult: e.data })
    }

    sandboxEval(code) {
      this.frame.contentWindow.postMessage(code, '*')
    }

    render() {
      return (
        <div>
          <WrappedComponent 
            sandboxEval={this.sandboxEval}
            sandboxResult={this.state.sandboxResult}
            {...this.props} 
          />
          <iframe
            ref={(frame) => { this.frame = frame }}
            src="http://localhost:3000/sandbox.html"
            sandbox="allow-scripts"
            style={style}
          >
          </iframe>
        </div>
      )
    }
  }
  WithSandbox.displayName = `WithSandbox(${getDisplayName(WrappedComponent)})`
  return WithSandbox
}

export default withSandbox