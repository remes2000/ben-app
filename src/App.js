import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from './actions/authenticationActions'
import { openSocket } from './actions/duelModeActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'

import Header from './components/Header'
import Play from './components/pages/Play'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import TopPlayers from './components/pages/TopPlayers'
import Highscores from './components/pages/Highscores'
import Profile from './components/pages/Profile'
import Duel from './components/pages/Duel'
import CreateDuelRoom from './components/pages/CreateDuelRoom'
import DuelRoom from './components/pages/DuelRoom'
import Dashboard from './components/pages/Dashboard'

import UserRoute from './routes/UserRoute'
import GuestRoute from './routes/GuestRoute'

class App extends Component {

  componentWillMount(){
    this.props.fetchUser()
    this.props.openSocket()
  }
  
  render() {
    return (
      <div>
          <BrowserRouter>
              <MuiThemeProvider>
                <div>
                  <Header />
                  <div className="container">
                    <Switch>
                      <Route path="/profile/:id" component={Profile} />
                      <UserRoute path="/duel/create_room" component={ CreateDuelRoom } />
                      <Route path="/duel/duel_room" component={ DuelRoom } />
                      <UserRoute path="/duel" component={Duel} />
                      <Route path="/highscores" component={Highscores} />                      
                      <Route path="/top" component={TopPlayers} />
                      <Route path="/play" component={Play} />
                      <GuestRoute path="/register" component={Register} />
                      <GuestRoute path="/login" component={Login} />
                      <Route path="/" component={Dashboard} />
                    </Switch>
                  </div>
                </div>
              </MuiThemeProvider>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser, openSocket } )(App)
