import React, { Component } from 'react';
import './stylesheets/bootstrap.css';
import './stylesheets/main.css'

import {fire}  from './config/Fire';
import Home from './components/Home/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';

import { pts } from './pts';

class App extends Component {
  constructor() {
    super();
    this.authListener = this.authListener.bind(this);
    this.state = {
      userAuth: null,
      isPT : false,
      pt: null,
    };
  }

  componentDidMount() {   
    this.authListener();
  }

  authListener() { 
    fire.auth().onAuthStateChanged((u) => {
      if (u) { 


        let found = pts.find(element => element.email == u.email);
        
        if(found != null) {
          
          this.setState({isPT : true})
          this.setState({ pt : found})
        } else {
          this.setState({isPT : false})
          this.setState({ pt : null})
        }
      
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

                this.state.isPT == true
                  ? <Dashboard pt={this.state.pt} />
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