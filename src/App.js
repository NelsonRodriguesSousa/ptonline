import React, { Component } from 'react';
import './stylesheets/bootstrap.css';
import './stylesheets/main.css'

import {fire}  from './config/Fire';
import Home from './components/Home/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';

var admins = [
  'B6a5YeK63nVjYYsR3LjOqqKGSq92',
  '7JR2BIzi72WRCC8uv0jD3mDFpBH2',
  'usQyoDWpn8YyDPem6ZwoQt2Jzhh1', 
  'Hey0QY7u1QWXJeTCSz8NRmJXAph2', //ip
  'd4EVn35jQjYk2eGNWixKS9vhYqC2' // colega do Quintas
]

var pts = [
  "admin@teste.pt",
  "miguelt@oxygenapp.pt",
  "brunol@oxygenapp.pt",
  "hugom@oxygenapp.pt",
  "joaoleite@ptonline.pt",
  "faraujo@oxygenapp.pt",


  // NOVOS

  ""
]



class App extends Component {
  constructor() {
    super();
    this.authListener = this.authListener.bind(this);
    this.state = {
      userAuth: null,
    };
  }

  componentDidMount() {   
    this.authListener();
  }

  authListener() { 
    fire.auth().onAuthStateChanged((u) => {
      if (u) { 
        this.setState({ userAuth: u });
      } else {
        this.setState({ userAuth: null });
      }
    });  
  }
  
  
  render() {
    return (
      <div>
        {
          this.state.userAuth ? [
              (

                pts.includes( this.state.userAuth.email)
                  ? <Dashboard />
                  : <Home />
              )
            ]
            : 
            <Login/>
        }
      </div>)
  }
}

export default App;