import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const spanStyle = {
  color: 'red',
  fontWeight: 'bold'
}

class TestItem extends PureComponent {
  render() {
    const { sandboxResult, inputs, expected, output } = this.props

    return (
      <tr>
        <td>{JSON.stringify(inputs)}</td>
        <td>{JSON.stringify(expected)}</td>
        <td>
          {sandboxResult ?
            (sandboxResult === true
              ? <span className="label label-success"><i className="icon icon-check"></i></span>
              : <span style={spanStyle}>
                  {JSON.stringify(sandboxResult[0])}
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
  inputs: PropTypes.arrayOf(PropTypes.any),
  expected: PropTypes.any,
  output: PropTypes.any
}

export default TestItem
