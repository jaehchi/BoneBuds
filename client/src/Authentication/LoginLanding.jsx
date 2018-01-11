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
              <Login  handleUserToken={this.props.handleUserToken}/>
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Signup handleUserToken={this.props.handleUserToken}/>
            )}
          />
        </Switch>
      </main>
    )
  }
}


export default LoginLanding;