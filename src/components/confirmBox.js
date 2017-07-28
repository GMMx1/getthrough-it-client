import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'


class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if ((!domNode || !domNode.contains(event.target))) {
      this.props.cancel()
    }
  }

  render() {
    return (
      <div id="Confirmation" >
        <p style={{padding: "10px 0px 3px"}}>ARE YOU SURE?</p>
        <p style={{padding: "0px 0px 10px 0px"}}>ALL PROGRESS FOR CURRENT CHALLENGE WILL BE LOST!!!</p>
        <button style={{bottom: "0", left: "0", position: "absolute"}} onClick={this.props.cancel}>CANCEL</button>
        <button style={{bottom: "0", right: "0", position: "absolute"}} onClick={this.props.proceed}>OK</button>
      </div>
    )
  }
}

Confirmation.propTypes = {
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func      // called when cancel button is clicked.
}

export default Confirmation;
