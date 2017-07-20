import React from 'react'

import TestItem from '../components/TestItem'

// check if sandboxResult is an array first, if not it is an error and print error on thingy
// also check if tests are hidden

const renderTestItems = (sandboxResult) => ([inputs, expected], i) => {
  return (
    <TestItem
      key={inputs}
      inputs={inputs}
      expected={expected}
      sandboxResult={sandboxResult[i]}
    />
  )
}

export default renderTestItems
