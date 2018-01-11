import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';
import { Link, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

class LoginLanding extends Component {
  constructor(props) {
    super(props)
  } 
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <Login />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Signup />
            )}
          />
        </Switch>
      </main>
    )
  }
}


export default LoginLanding;