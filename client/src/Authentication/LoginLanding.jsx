import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';

class LoginLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
    this.emailSignup = this.emailSignup.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  emailSignup() {
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(() => {
        console.error('error creating user');
      })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const usersRef = firebase.database().ref('users');
        const dbUser = {
          userName: user.email,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
        this.props.handleUserToken();
      }
    })
  }
  emailLogin() {
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        console.error('error creating user');
      })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.handleUserToken();
      }
    })
  }
  googleLogin() {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        const user = result.user;
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
        this.props.handleUserToken();
      });
  }
  facebookLogin() {
    auth.signInWithPopup(facebookProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        const user = result.user;
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
        this.props.handleUserToken();
      });
  }
  render() {
    return (
      <div className="loginLanding">
        <div >
          Email:<br />
          <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
          <br />
          Password:<br />
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <br /><br />
          <input type="submit" value="Login" onClick={this.emailLogin} />
          <input type="submit" value="Signup" onClick={this.emailSignup} />
        </div>
        <div>
          <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>Log In with Google</button>
        </div>
        <div>
          <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>Log In with Facebook</button>
        </div>
      </div>
    )
  }
}


export default LoginLanding;