import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Corporativo from './components/Corporativo'
import ResetPassword from './components/ResetPassword'

import { Route, BrowserRouter as Router } from 'react-router-dom'

import AOS from 'aos';
AOS.init();


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Corporativo} />
      <Route exact path="/login" component={App} />
      <Route exact path="/reset" component={ResetPassword} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))