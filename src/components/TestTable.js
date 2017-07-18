import React, { PureComponent } from 'react'

import renderTestItems from '../utils/renderTestItems'

class TestTable extends PureComponent {
  render() {
    const { tests, sandboxResult } = this.props

    return (
      <table className="container test-suite table">
        <thead>
          <tr>
            <th>Input</th>
            <th>Expected</th>
            <th>Ouput</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(renderTestItems(sandboxResult))}
        </tbody>
      </table>
    )
  }
}


export default TestTable