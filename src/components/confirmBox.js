import React from 'react'
// import { confirmable } from 'react-confirm';

// const Confirmation = ({show, dismiss, proceed, cancel})




//make function for proceed and cancel (Promisify them)
const Confirmation = ({show, proceed, dismiss, cancel}) => {
  // for
  <div class="modal confirmation" onHide={dismiss} show={show}>
    <button onClick={() => cancel('arguments will be passed to the callback')}>CANCEL</button>
    <button onClick={() => proceed('same as cancel')}>OK</button>
  </div>
}

YourDialog.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
}

export default Confirmation
