import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';

class LoginLanding extends Component {
  constructor(props) {
    super(props)
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
  }
  googleLogin() {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        const user = result.user;
        this.setState({
          user
        });
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
        this.props.handleLogin();
      });
  }
  facebookLogin() {
    auth.signInWithPopup(facebookProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        const user = result.user;
        this.setState({
          user
        });
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
        this.props.handleLogin();
      });
  }
  render() {
    return (
      <div className="loginLanding">
        <div >
          Email:<br />
          <input type="text" name="email" />
          <br />
          Password:<br />
          <input type="password" name="password" />
          <br /><br />
          <input type="submit" value="Submit" />
        </div>
        <div>
          <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>Log In with Google</button>
          <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>Log In with Facebook</button>
        </div>
      </div>
    )
  }
}


export default LoginLanding;