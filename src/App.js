import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as authActions from './actions/authenticationActions'
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

import UserRoute from './routes/UserRoute'
import GuestRoute from './routes/GuestRoute'
 
const Dashboard = () => <div><p>Dashboard</p></div>

class App extends Component {

  componentDidMount(){
    this.props.fetchUser()
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

export default connect(null, authActions)(App)
