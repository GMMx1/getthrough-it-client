import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { history } from 'react-router-dom'

import './index.css'
import AppContainer from './containers/AppContainer'
import registerServiceWorker from './registerServiceWorker'

import authReducer, { ajaxReducer } from './reducers/authentication'

export const store = createStore(
  combineReducers({
    auth: authReducer,
    ajax: ajaxReducer
  }),
  applyMiddleware(thunk)
)

export const renderApp = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

if (process.env.NODE_ENV !== 'test') 
  ReactDOM.render(renderApp(), document.getElementById('root'))

registerServiceWorker()
