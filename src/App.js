import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css'

import Header from './components/Header'
import Play from './components/pages/Play'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
const Dashboard = () => <div><p>Dashboard</p></div>

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
              <MuiThemeProvider>
                <div>
                  <Header />
                  <div className="container">
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/play" component={Play} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                  </div>
                </div>
              </MuiThemeProvider>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
