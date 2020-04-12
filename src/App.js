import React, { Component } from 'react';
import './stylesheets/bootstrap.css';
import './stylesheets/main.css'

import {fire}  from './config/Fire';
import Home from './components/Home/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';

var imagemDefault = "https://i.imgur.com/D11Q66u.png"

var pts = [
  {
    email: "admin@teste.pt",
    nome: "Admin",
    imagem: imagemDefault, // imagem default
  },
  {
    email: "dcr0021@hotmail.com", // diiRibeiro
    nome: "Diana Ribeiro",
    imagem: "https://i.imgur.com/SHaWbLZ.png",
  },
  {
    email: "dannysete@hotmail.com", // Internet1998
    nome: "João Daniel",
    imagem: "https://i.imgur.com/Tgszgga.png",
  },
  {
    email: "gavinamiguel@gmail.com", //gavina2020
    nome: "Miguel Gavina",
    imagem: "https://i.imgur.com/092R5Ak.png",
  },
  {
    email: "joaoplleite@gmail.com", // elninja
    nome: "João Leite",
    imagem: imagemDefault ,
    flag: 'pt',
  }
]

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