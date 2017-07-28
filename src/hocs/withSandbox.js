import React, { Component } from 'react'

import getDisplayName from '../utils/getDisplayName'
import expect from '../utils/expect'

const style = {
  display: 'none'
}

const withSandbox = (WrappedComponent) => {
  class WithSandbox extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.sandboxEval = this.sandboxEval.bind(this)
      this.sandboxResultListener = this.sandboxResultListener.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.currentChallenge && nextProps.currentChallenge) {
        if (this.props.currentChallenge.id !== nextProps.currentChallenge.id) {
          this.setState({
            sandboxResult: undefined
          })
        }
      }
    }

    componentDidMount() {
      window.addEventListener('message', this.sandboxResultListener)
    }

    componentWillUnmount() {
      window.removeEventListener('message', this.sandboxResultListener)
    }

    sandboxResultListener(e) {
      if (e.origin === 'null' && e.source === this.frame.contentWindow)
        this.setState({ sandboxResult: e.data })
    }

    sandboxEval(code) {
      code = `const expect = ${expect}
      ${code}
      ${JSON.stringify(this.props.currentChallenge.input_output)}.map(pair => expect(${this.props.currentChallenge.name}(...pair[0]), pair[1], "${this.props.currentChallenge.output_type}"))`
      this.frame.contentWindow.postMessage(code, '*')
    }

    render() {
      return (
        <div>
          <iframe
            title="sandbox"
            ref={(frame) => { this.frame = frame }}
            src="/sandbox.html"
            sandbox="allow-scripts"
            style={style}
          >
          </iframe>
          <WrappedComponent
            sandboxEval={this.sandboxEval}
            sandboxResult={this.state.sandboxResult}
            {...this.props}
          />
        </div>
      )
    }
  }
  WithSandbox.displayName = `WithSandbox(${getDisplayName(WrappedComponent)})`
  return WithSandbox
}

export default withSandbox
