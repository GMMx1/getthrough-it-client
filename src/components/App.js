import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import 'spectre.css/docs/dist/spectre.min.css'
import 'spectre.css/docs/dist/spectre-exp.min.css'
import 'spectre.css/docs/dist/spectre-icons.min.css'

import './App.css'

import LobbyPage from './pages/LobbyPage'

import {
  HOME,
  LOGIN,
  LOGOUT,
  lobby,
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
            <Route exact path={lobby()} render={() => <LobbyPage />} />
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
