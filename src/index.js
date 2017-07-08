import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import authReducer, { ajaxReducer } from './reducers/authentication'

const store = createStore(
  combineReducers({
    auth: authReducer,
    ajax: ajaxReducer
  })
)

window.dispatch = store.dispatch

const renderApp = (store) => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(renderApp(store), document.getElementById('root'))

registerServiceWorker()
