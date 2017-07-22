import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const spanStyle = {
  color: 'red',
  fontWeight: 'bold'
}

class TestItem extends PureComponent {
  render() {
    const { sandboxResult, inputs, expected, output } = this.props
    var trStyle = {textAlign: "center"}
    if (sandboxResult === true) {
      trStyle = {textAlign: "center", color: "green", fontWeight: "bold"}
    } else if (sandboxResult) {
      trStyle = {textAlign: "center", color: "red", fontWeight: "bold"}
    }

    return (
      <tr style={trStyle}>
        <td >{JSON.stringify(inputs).slice(1, -1)}</td>
        <td >{typeof expected !== 'string' ? JSON.stringify(expected) : expected}</td>
        <td>
          {sandboxResult ?
            (sandboxResult === true
              ? <span className="label label-success"><i className="icon icon-check"></i></span>
              : <span style={spanStyle}>
                  {typeof sandboxResult[0] !== 'string' ? JSON.stringify(sandboxResult[0]) : sandboxResult[0]}
                  <i className="icon icon-cross" />
                </span>)
            : `-`
          }
        </td>
      </tr>
    )
  }
}

TestItem.propTypes = {
  sandboxResult: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.bool
  ]),
  inputs: PropTypes.any,
  expected: PropTypes.any,
  output: PropTypes.any
}

export default TestItem
