import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import './App.css'

import {
  HOME,
  LOGIN,
  LOGOUT,
} from '../routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={HOME} render={() => <span>Home</span>} />
            <Route exact path={LOGIN} render={() => <span>Login</span>} />
            <Route exact path={LOGOUT} render={() => <span>Logout</span>} />
            <Route render={() => <span>Catch All</span>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
