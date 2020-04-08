import React, { Component } from 'react';
import './stylesheets/bootstrap.css';
import './stylesheets/main.css'

import {fire}  from './config/Fire';
import Home from './components/Home/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';

var pts = [
  "admin@teste.pt",
  
  "miguelt@oxygenapp.pt",
  "brunol@oxygenapp.pt",
  "hugom@oxygenapp.pt",
  "joaoleite@ptonline.pt",
  "faraujo@oxygenapp.pt",

  // NOVOS

  "dcr0021@hotmail.com", // diiRibeiro
  "dannysete@hotmail.com" // Internet1998
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