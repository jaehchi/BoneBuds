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
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }
  emailLogin() {
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('getting here');
        this.props.handleUserToken();
      })
      .catch(() => {
        console.error('error creating user');
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
          <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
          <br />
          Password:<br />
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <br /><br />
          <input type="submit" value="Submit" onClick={this.emailLogin}/>
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