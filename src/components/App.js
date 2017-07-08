import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            <Route exact path={HOME} render={() => <h3>Home GMMx1</h3>} />
            <Route exact path={LOGIN} render={() => <span>Login</span>} />
            <Route exact path={LOGOUT} render={() => <span>Logout</span>} />
            <Route render={() => <span>Catch All</span>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
