import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

const Header = () => <h1>Header</h1>
const Dashboard = () => <div><p>Dashboard</p></div>
const Footer = () => <p>Footer</p>

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
              <div>
                <Header />
                <div>
                  <Route exact path="/" component={Dashboard} />
                </div>
                <Footer />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
