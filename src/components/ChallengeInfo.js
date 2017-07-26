import React, {Component} from 'react'
import TestTable from './TestTable'

class ChallengeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shown: 'instruction',
      instructionStyle: 'onActive',
      testStyle: ''
    }
    this.toggleToTest = this.toggleToTest.bind(this)
    this.toggleToInstruction = this.toggleToInstruction.bind(this)
  }

  toggleToTest() {
    this.setState({
      shown: 'test',
      testStyle: 'onActive',
      instructionStyle: ''
    })
  }

  toggleToInstruction() {
    this.setState({
      shown: 'instruction',
      instructionStyle: 'onActive',
      testStyle: ''
    })
  }

  render() {
    return (
      <div>
        <div id="ChallengeInfoTabStrip">
          <button className={"challenge-tab " + this.state.instructionStyle} onClick={this.toggleToInstruction}>Instructions</button>
          <button className={"challenge-tab " + this.state.testStyle} onClick={this.toggleToTest}>Tests</button>
        </div>

        {this.state.shown === 'instruction'
        ? <div id="ChallengeInstruction">{this.props.currentChallenge.question}</div>
        : <div className="test-suite">
          <TestTable
          tests={this.props.currentChallenge.input_output || []}
          sandboxResult={this.props.sandboxResult || []} />
          </div>}

      </div>
    )
  }
}

export default ChallengeInfo





// <div>
// // <div className="text-bold centered">{this.props.currentChallenge.name}</div>
// {this.props.currentChallenge.question}
// {!!this.props.currentChallenge &&
//   <div className="test-suite">
//   <TestTable
//   tests={this.props.currentChallenge.input_output || []}
//   sandboxResult={this.props.sandboxResult || []} />
//   </div> }
// //   </div>
