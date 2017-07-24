import React, { PureComponent } from 'react'

import renderTestItems from '../utils/renderTestItems'

class TestTable extends PureComponent {
  constructor(props) {
    super(props)

  }
  render() {
    const { sandboxResult, tests  } = this.props

    return (
      <table id="TestTable">
        <thead>
          <tr>
            <th>Input</th>
            <th>Expected</th>
            <th>Ouput</th>
          </tr>
        </thead>
        <tbody className="lobby-table">
          {Array.isArray(sandboxResult) ? tests.map(renderTestItems(sandboxResult)) : tests.map(renderTestItems([])) }
        </tbody>
      </table>


    )
  }
}


export default TestTable
