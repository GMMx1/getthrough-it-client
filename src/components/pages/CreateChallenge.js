import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import { fget, fput, fpost } from '../../utils/fetchHelper'


class CreateChallenge extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      numInputs: 0,
      inputs: {},
      outputType: "String",
      numTests: 0,
      tests: {},
      functionName: undefined
    }
    this.initialValInputDict = {
      Array: "[ ]",
      Object: "{ }",
      Boolean: "true"
    }
  }



  handleFuncChange(event) {
    this.setState({
      functionName: event.target.value.length > 0 ? event.target.value.trim() : undefined
    })
  }

  handleChangeNumInputs(event) {
    var inputs = {}
    for (var i = 0; i < event.target.value; i++) {
      inputs[i] = this.state.inputs[i] || [undefined, "String"]
    }
    this.setState({
      numInputs: Number(event.target.value),
      inputs: inputs
    }, this.updateTests)
  }

  handleChangeDataType(event) {
    var idx = Number(event.target.id.slice(-1))
    var o1 = {}
    o1[idx] = [this.state.inputs[idx][0], event.target.value]
    this.setState({
      inputs: {...this.state.inputs, ...o1}
    }, this.updateTests)
  }

  handleInputNameChange(event) {
    var idx = Number(event.target.id.slice(-1))
    var o1 = {}
    o1[idx] = [event.target.value.trim(), this.state.inputs[idx][1]]
    this.setState({
      inputs: {...this.state.inputs, ...o1}
    })
    console.log(this.state.inputs[0] ?
      Object.values(this.state.inputs).map(arr => arr[0] === undefined ? "_" : arr[0]).join(", ")
      : "inputs")
  }

  handleOutputType(event) {
    this.setState({
      outputType: event.target.value
    }, this.updateTests)
  }

  updateTests() {
    var tests = {...this.state.tests}
    for (var key in tests) {
      tests[key][0] = tests[key][0].slice(0, this.state.numInputs)
      for (var i = 0; i < this.state.numInputs; i++) {
        tests[key][0][i] = tests[key][0][i] || this.initialValInputDict[this.state.inputs[i][1]]
      }
      tests[key][1] = tests[key][1] || this.initialValInputDict[this.state.outputType]
    }
    this.setState({
      tests: tests
    }, () => {console.log('this.state.tests: ', this.state.tests)})
  }

  addTest() {
    var newTest = {}
    newTest[this.state.numTests] = [[], undefined]
    this.setState({
      numTests: (this.state.numTests + 1),
      tests: {...this.state.tests, ...newTest}
    }, this.updateTests)
  }

  deleteTest(i) {
    var tests = {...this.state.tests}
    delete tests[Number(i)]
    this.setState({
      tests: tests
    })
  }

  outputTestChange(event) {
    console.log('event.target.value: ', event.target.value)
    var idx = Number(event.target.id.replace("outputValue_", ""))
    var test = {}
    test[idx] = this.state.tests[idx].slice()
    test[idx][1] = event.target.value
    this.setState({
      tests: {...this.state.tests, ...test}
    }, () => {console.log('this.state.tests: ', this.state.tests)})
  }

  inputTestChange(event) {
    var idx = Number(event.target.id.slice(0, event.target.id.indexOf('_')))
    var test = {}
    test[idx] = this.state.tests[idx].slice()
    test[idx][0][Number(event.target.id.slice(-1))] = event.target.value
    console.log('event.target.value: ', event.target.value)
    this.setState({
      tests: {...this.state.tests, ...test}
    }, () => {console.log('this.state.tests: ', this.state.tests)})
  }

  onSubmit() {
    // check for functionName
    if (!this.state.functionName) {
      return alert("Invalid Function Name")
    }

    // add input variable names to array and make sure they are valid
    var inputArray = []
    var inputProps = Object.values(this.state.inputs)
    for (var idx = 0 ; idx < inputProps.length; idx++) {
      var arr = inputProps[idx]
      if (arr[0]) {
        if (inputArray.includes(arr[0])) {
          return alert("Duplicate Varible names.  Var#"+(idx+1))
        } else {
          inputArray.push(arr[0])
        }
      } else {
        return alert("Variable Name is invalid.  Var#"+(idx+1))
      }
    }

    //make sure there is at least one test
    if (Object.keys(this.state.tests).length === 0) {
      return alert("You must have at least one test")
    }

    //make sure all inputs in tests have values and correspond to their data type
    var tests = []
    for (var key in this.state.tests) {
      var key_idx = Object.keys(this.state.tests).indexOf(key)
      var currentTest = []
      var testInputs = []
      var inputs = this.state.tests[key][0]
      if (inputs.length !== this.state.numInputs) {
        return alert("Error: test inputs length not equal to number of inputs.  test#:"+(key_idx+1))
      }
      for (var i = 0; i < inputs.length; i++) {
        var curInput = inputs[i]
        var dataType = this.state.inputs[i][1]
        if (dataType === "Boolean") {
          if (curInput === "true" || curInput === "false") {
            testInputs.push(Boolean(curInput))
          } else {
            return alert("Test Input Error (Invalid Boolean): test#:"+(key_idx+1)+" input#"+(i+1))
          }
        } else if (dataType === "String") {
          if (curInput && curInput.length > 0) {
            testInputs.push(curInput)
          } else {
            return alert("Test Input Error (Invalid String) (empty input): test#:"+(key_idx+1)+" input#"+(i+1))
          }
        } else if (dataType === "Number") {
          try {
            testInputs.push(Number(curInput))
          } catch(e) {
            return alert("Test Input Error (Invalid Number): test#:"+(key_idx+1)+" input#"+(i+1))
          }
        } else if (dataType === "Array") {
          try {
            curInput = JSON.parse(curInput)
            if (Array.isArray(curInput)) {
              testInputs.push(curInput)
            } else {
              return alert("Test Input Error (Invalid Array): test#:"+(key_idx+1)+" input#"+(i+1))
            }
          } catch(e) {
            return alert("Test Input Error (Invalid Array): test#:"+(key_idx+1)+" input#"+(i+1))
          }
        } else if (dataType === "Object") {
          try {
            curInput = JSON.parse(curInput)
            if (!Array.isArray(curInput) && (typeof curInput === "object")) {
              testInputs.push(curInput)
            } else {
              return alert("Test Input Error (Invalid Object): test#:"+(key_idx+1)+" input#"+(i+1))
            }
          } catch(e) {
            return alert("Test Input Error (Invalid Object): test#:"+(key_idx+1)+" input#"+(i+1))
          }
        }
      }

      currentTest.push(testInputs)
      //testOutputs

      var curOutput = this.state.tests[key][1]
      var dataType = this.state.outputType
      if (dataType === "Boolean") {
        if (curOutput === "true" || curOutput === "false") {
          currentTest.push(Boolean(curOutput))
        } else {
          return alert("Test Output Error (Invalid Boolean): test#:"+(key_idx+1))
        }
      } else if (dataType === "String") {
        if (curOutput && curOutput.length > 0) {
          currentTest.push(curOutput)
        } else {
          return alert("Test Output Error (Invalid String) (empty input): test#:"+(key_idx+1))
        }
      } else if (dataType === "Number") {
        try {
          currentTest.push(Number(curOutput))
        } catch(e) {
          return alert("Test Output Error (Invalid Number): test#:"+(key_idx+1))
        }
      } else if (dataType === "Array") {
        try {
          curOutput = JSON.parse(curOutput)
          if (Array.isArray(curOutput)) {
            currentTest.push(curOutput)
          } else {
            return alert("Test Output Error (Invalid Array): test#:"+(key_idx+1))
          }
        } catch(e) {
          return alert("Test Output Error (Invalid Array): test#:"+(key_idx+1))
        }
      } else if (dataType === "Object") {
        try {
          curOutput = JSON.parse(curOutput)
          if (!Array.isArray(curOutput) && (typeof curOutput === "object")) {
            currentTest.push(curOutput)
          } else {
            return alert("Test Output Error (Invalid Object): test#:"+(key_idx+1))
          }
        } catch(e) {
          return alert("Test Output Error (Invalid Object): test#:"+(key_idx+1))
        }
      }
      tests.push(currentTest)
    }

    //

    console.log("tests: ", tests)

  }

  createNewChallenge(body) {
    fetch(`http://localhost:8000/v1/challenges`, fpost(body))
  }

  render() {
    return (
      <div style={{color: "black"}}>
        <button style={{position: "fixed", top: "20px", right: "20px", width: "200px", height: "100px"}} onClick={this.onSubmit.bind(this)}>Submit Challenge</button>
        <div style={{float: "left", padding: "25px", fontSize: "20px"}}>
          <span> function </span>
          <input type="text" name="FunctionName" id="FunctionName" value={this.state.functionName} onChange={this.handleFuncChange.bind(this)} placeholder="name of function"/>
          <span>   (</span><span style={{fontStyle: "italic", color: "gray", fontSize: "16px"}}>
          {this.state.inputs[0] ?
            Object.values(this.state.inputs).map(arr => arr[0] === undefined || arr[0].length === 0 ? "_" : arr[0]).join(", ")
            : "inputs"}
          </span><span>) {" { }"}</span>
          <br />
        </div>
      <br />
      <label style={{float: "left", clear: "both", padding: "25px"}}>
        Output Data Type:&nbsp;&nbsp;&nbsp;
        <select name="dataType" id="outputType" value={this.state.outputType} onChange={this.handleOutputType.bind(this)}>
          <option value={"String"}>String</option>
          <option value={"Number"}>Number</option>
          <option value={"Boolean"}>Boolean</option>
          <option value={"Array"}>Array</option>
          <option value={"Object"}>Object</option>
        </select>
      </label>
      <label style={{float: "left", clear: "both", padding: "25px"}}>
        Number of Inputs:&nbsp;&nbsp;&nbsp;
        <select name="numInputs" value={this.state.numInputs} onChange={this.handleChangeNumInputs.bind(this)}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </label>
      <div className="container table addInputs" style={{float: "left", clear: "both", padding: "25px", width: "500px"}}>
        <div style={{fontSize: "18px"}}>FUNCTION INPUTS</div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th>Input Name</th>
              <th>Data Type</th>
            </tr>
          </thead>
          <tbody>
            {console.log("[...Array(this.state.numInputs)]: ",[...Array(this.state.numInputs)])}
            {[...Array(this.state.numInputs)].map((x, i) =>
              <tr key={i}>
                <td>
                  <span> {i+1}.  </span>
                  <label>Input Name:  </label>
                  <input type="text" name="Input" id={"inputName_"+i} onChange={this.handleInputNameChange.bind(this)} placeholder="Input Name"/>
                </td>
                <td>
                  <label>Data Type:
                    <select name="dataType" id={"inputType_"+i} onChange={this.handleChangeDataType.bind(this)}>
                      <option value={"String"}>String</option>
                      <option value={"Number"}>Number</option>
                      <option value={"Boolean"}>Boolean</option>
                      <option value={"Array"}>Array</option>
                      <option value={"Object"}>Object</option>
                    </select>
                  </label>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <div className="container table addTests" style={{float: "left", clear: "both", padding: "25px", width: "500px"}}>
        <div style={{fontSize: "18px"}}>TESTS</div>
        <table style={{width: "100%"}}>
          <thead>
            <tr>
              <th>Input(s)</th>
              <th>Expected Output</th>
            </tr>
          </thead>
          <tbody>
            {/* {[...Array(this.state.numTests)].map((x, i) => */}
            {Object.keys(this.state.tests).map((i, idx) =>
              <tr key={i}>
                {console.log('this.state.tests: ', this.state.tests)}
                <td>
                  <span style={{width: "100%"}}> {idx+1}.  </span>
                  {Object.values(this.state.inputs).map((arr,idx) => {
                      if (this.state.inputs[idx][1] !== "Boolean") {
                        return (
                          <label key={i+"_"+idx} style={{float: "left", clear: "both", padding: "3px", width: "100%"}}>{arr[0]}:&nbsp;&nbsp;
                            <input onChange={this.inputTestChange.bind(this)} style={{width: "50%", padding: "3px"}} type="text" name="Input" id={i+"_"+idx} placeholder={this.state.inputs[idx][1]} value={this.state.tests[Number(i)][0][Number(idx)]}/>
                          </label>
                        )
                      }
                      return (
                        <label key={i+"_"+idx} style={{float: "left", clear: "both", padding: "3px",  width: "100%"}} >{arr[0]}:&nbsp;&nbsp;
                          <select onChange={this.inputTestChange.bind(this)} name="bool" value={this.state.tests[Number(i)][0][Number(idx)]} id={i+"_"+idx}>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                          </select>
                        </label>
                      )
                    }
                  )}
                </td>
                <td>
                  <label>Output:
                  {this.state.outputType !== "Boolean" ?
                     <input onChange={this.outputTestChange.bind(this)} type="text" name="Output" id={"outputValue_"+i} value={this.state.tests[Number(i)][1]} placeholder={this.state.outputType}/>
                  :
                    <select onChange={this.outputTestChange.bind(this)} name="bool" id={"outputValue_"+i} value={this.state.tests[Number(i)][1]}>
                      <option value={true}>true</option>
                      <option value={false}>false</option>
                    </select>
                  }
                  </label>
                </td>
                <td>
                  <i style={{cursor: "pointer", color: "red"}} className="icon icon-cross deleteTest" onClick={() => {this.deleteTest(i)}}></i>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={this.addTest.bind(this)}>Add Test</button>
      </div>
    </div>
    )
  }
}

export default withRouter(CreateChallenge)