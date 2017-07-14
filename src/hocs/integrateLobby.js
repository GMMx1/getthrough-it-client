import React, { Component } from 'react'

const integrateLobby = (WrappedComponent) => {
  class IntegrateLobby extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      )
    }
  }
  IntegrateLobby.displayName = `IntegrateLobby(${getDisplayName(WrappedComponent)})`
  return IntegrateLobby
}