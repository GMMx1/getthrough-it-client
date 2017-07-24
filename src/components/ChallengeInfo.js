import React, {Component} from 'react'
import TestTable from '../components/TestTable'
import Tabs from 'react-simpletabs'
class ChallengeInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="text-bold centered">{this.props.currentChallenge.name}</div>
        <div>{this.props.currentChallenge.question}</div>
        {!!this.props.currentChallenge &&
          <div className="test-suite">
            <TestTable
              tests={this.props.currentChallenge.input_output || []}
              sandboxResult={this.props.sandboxResult || []} />
            </div> }
      </div>
    )
  }
}

export default ChallengeInfo
