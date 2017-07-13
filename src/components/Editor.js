import React, { Component } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/jsx'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

class Editor extends Component {
  onLoad() {
    console.log('i\'ve loaded');
  }
  onChange(newValue) {
    console.log('new value is: ', newValue);
    this.setState({
      value: newValue
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '\/\/code here!',
      theme: 'monokai',
      mode: 'javascript',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: false,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
      width: '100%',
      height: '100%'
    };
  }

  render() {
    return (
      <AceEditor
        mode={this.state.mode}
        theme={this.state.theme}
        name="editor-1"
        onLoad={this.onLoad}
        onChange={this.props.onChange || this.onChange.bind(this)}
        onSelectionChange={this.onSelectionChange}
        fontSize={this.state.fontSize}
        width={this.state.width}
        height={this.state.height}
        showPrintMargin={this.state.showPrintMargin}
        showGutter={this.state.showGutter}
        highlightActiveLine={this.state.highlightActiveLine}
        value={this.props.value}
        setOptions={{
          enableBasicAutocompletion: this.state.enableBasicAutocompletion,
          enableLiveAutocompletion: this.state.enableLiveAutocompletion,
          enableSnippets: this.state.enableSnippets,
          showLineNumbers: this.state.showLineNumbers,
          tabSize: 2,
      }}/>
    )
  }
}

export default Editor
