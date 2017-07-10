import React from 'react'
import ReactDOM from 'react-dom'
import { renderApp } from './index'

it('renders the App without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(renderApp(), div);
})