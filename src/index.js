import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import authReducer, { ajaxReducer } from './reducers/authentication'

export const store = createStore(
  combineReducers({
    auth: authReducer,
    ajax: ajaxReducer
  })
)

export const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

if (process.env.NODE_ENV !== 'test') 
  ReactDOM.render(renderApp(), document.getElementById('root'))

registerServiceWorker()
