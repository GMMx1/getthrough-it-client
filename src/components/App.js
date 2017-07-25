import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import 'spectre.css/docs/dist/spectre.min.css'
import 'spectre.css/docs/dist/spectre-exp.min.css'
import 'spectre.css/docs/dist/spectre-icons.min.css'
import 'animate.css/animate.min.css'
import './App.css'

import LobbyPage from './pages/LobbyPage'
import LandingPage from './pages/LandingPage'
import CreateChallenge from "./pages/CreateChallenge"

import {
  HOME,
  LOGIN,
  LOGOUT,
  ADD_CHALLENGE,
  lobby,
} from '../routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path={HOME} render={() => <LandingPage />} />
            <Route exact path={LOGIN} render={() => <span>Login</span>} />
            <Route exact path={LOGOUT} render={() => <span>Logout</span>} />
            <Route exact path={ADD_CHALLENGE} render={() => <CreateChallenge />} />
            <Route exact path={lobby()} render={() => <LobbyPage />} />
            <Route render={() => <span>Catch All</span>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
