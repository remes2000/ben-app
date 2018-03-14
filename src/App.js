import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from './actions/authenticationActions'
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
import Achievements from './components/pages/Achievements'

//import UserRoute from './routes/UserRoute'
import GuestRoute from './routes/GuestRoute'
import DuelPlayerRoute from './routes/DuelPlayerRoute'
import SocketRoute from './routes/SocketRoute'

class App extends Component {

  componentWillMount(){
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
                        <Route path="/achievements/:id" component={Achievements} />
                        <SocketRoute path="/duel/create_room" component={ CreateDuelRoom } />
                        <DuelPlayerRoute path="/duel/duel_room" component={ DuelRoom } />
                        <SocketRoute path="/duel" component={ Duel } />
                        <Route path="/highscores" component={Highscores} />                      
                        <Route path="/top" component={TopPlayers} />
                        <Route path="/play" component={Play} />
                        <GuestRoute path="/register" component={Register} />
                        <GuestRoute path="/login" component={Login} />
                      </Switch>
                    </div>
                    <Route path="/" component={Dashboard} exact />
                  </div>
              </MuiThemeProvider>
          </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    socket: state.socket
  }
}

export default connect(mapStateToProps, { fetchUser } )(App)
