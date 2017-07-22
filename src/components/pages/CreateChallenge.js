import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

class CreateChallenge extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      numInputs: 0,
      inputs: {},
      outputType: "String",
      numTests: 0
    }
    this.initialValInputDict = {
      Array: "[ ]",
      Object: "{ }"
    }
  }

  handleChangeNumInputs(event) {
    var inputs = {}
    for (var i = 0; i < event.target.value; i++) {
      inputs[i] = this.state.inputs[i] || [undefined, "String"]
    }
    this.setState({
      numInputs: Number(event.target.value),
      inputs: inputs
    })
  }

  handleChangeDataType(event) {
    var idx = Number(event.target.id.slice(-1))
    var o1 = {}
    o1[idx] = [this.state.inputs[idx][0], event.target.value]
    this.setState({
      inputs: {...this.state.inputs, ...o1}
    })
  }

  handleInputNameChange(event) {
    var idx = Number(event.target.id.slice(-1))
    var o1 = {}
    o1[idx] = [event.target.value, this.state.inputs[idx][1]]
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
    })
  }

  addTest() {
    this.setState({
      numTests: (this.state.numTests + 1)
    })
  }

  deleteTest(i) {
    console.log('testNum: ', i)
  }

  outputTestChange(event) {

  }

  inputTestChange(event) {
    
  }


  render() {
    return (
      <div style={{color: "black"}}>
        <button style={{position: "fixed", top: "20px", right: "20px", width: "200px", height: "100px"}}>Submit Challenge</button>
        <div style={{float: "left", padding: "25px", fontSize: "20px"}}>
          <span> function </span>
          <input type="text" name="FunctionName" id="FunctionName" placeholder="name of function"/>
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
            {[...Array(this.state.numTests)].map((x, i) =>
              <tr key={i}>
                <td>
                  <span style={{width: "100%"}}> {i+1}.  </span>
                  {Object.values(this.state.inputs).map((arr,idx) => {
                      if (this.state.inputs[idx][1] !== "Boolean") {
                        return (
                          <label key={i+"_"+idx} style={{float: "left", clear: "both", padding: "3px", width: "100%"}}>{arr[0]}:&nbsp;&nbsp;
                            <input onChange={this.inputTestChange.bind(this)} style={{width: "50%", padding: "3px"}} value={this.initialValInputDict[this.state.inputs[idx][1]]} type="text" name="Input" id={"inputValue_"+i+"_"+idx} placeholder={this.state.inputs[idx][1]}/>
                          </label>
                        )
                      }
                      return (
                        <label key={i+"_"+idx} style={{float: "left", clear: "both", padding: "3px",  width: "100%"}}>{arr[0]}:&nbsp;&nbsp;
                          <select onChange={this.inputTestChange.bind(this)} name="bool" value={true} id={"inputValue_"+i+"_"+idx}>
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
                     <input onChange={this.outputTestChange.bind(this)} type="text" name="Output" id={"outputValue"+i} value={this.initialValInputDict[this.state.outputType]} placeholder={this.state.outputType}/>
                  :
                    <select onChange={this.outputTestChange.bind(this)} name="bool" value={true} id={"outputValue_"+i}>
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
