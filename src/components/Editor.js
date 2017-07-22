import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'

import 'brace/mode/jsx'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

class Editor extends PureComponent {
  render() {
    return (
      <AceEditor
        value={this.props.value}
        onChange={this.props.onChange}
        mode="javascript"
        theme="monokai"
        name="editor-1"
        fontSize={14}
        width="100%"
        height="83vh"
        showGutter={true}
        showPrintMargin={false}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }} />
    )
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Editor.defaultProps = {
  value: ''
}

export default Editor
