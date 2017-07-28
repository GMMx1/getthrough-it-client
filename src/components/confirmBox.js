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
      <div id="ConfirmBox" className="modal active">
        <div className="modal-overlay"></div>
        <div className="modal-container">
          <div className="modal-body">
            <div className="content">
              <p>Are you sure?<br /> All progress will be discarded!</p>
              <button className="confirm-button text-centered" onClick={this.props.proceed}>Okay</button>
              <button className="confirm-button text-centered" onClick={this.props.cancel}>Cancel</button>
            </div>
          </div>
        </div>
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
