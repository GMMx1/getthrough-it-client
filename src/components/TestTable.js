import React, { PureComponent } from 'react'

import renderTestItems from '../utils/renderTestItems'

class TestTable extends PureComponent {
  constructor(props) {
    super(props)

  }
  render() {
    const { tests, sandboxResult } = this.props

    return (
      <table className="container table">
        <thead>
          <tr>
            <th>Input</th>
            <th>Expected</th>
            <th>Ouput</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sandboxResult) ? tests.map(renderTestItems(sandboxResult)) : tests.map(renderTestItems([]))}
        </tbody>
      </table>


    )
  }
}


export default TestTable
