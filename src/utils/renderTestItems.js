import React from 'react'

import TestItem from '../components/TestItem'

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