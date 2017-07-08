import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  combineReducers({
    test: () => ({})
  })
)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
