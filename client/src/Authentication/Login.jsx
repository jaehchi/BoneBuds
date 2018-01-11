import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',

    }
    this.googleLogin = this.googleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
        const payload = {
          userName: user.email,
          email: user.email,
          userId: user.uid
        }
        // below is sending post to server/db to check if user exists
        // if it doesn't, creates new user on sqlite
        axios.post('/users/createUser', payload)
          .then(() => {
            usersRef.child(user.uid).set(dbUser)
            this.props.handleUserToken();
          })
          .catch(() => {
            console.error('error signing up user');
          })
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
          <div>
            <button className="emailBtn" type="submit" value="Login" onClick={this.emailLogin}><span className="button__inner">LogIn</span> </button>
          </div>
        </div>
        <div>
          <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>Log In with Google</button>
        </div>
        <br />
        <div>
          <Link to="/signup"><button>Not a user? Sign Up!</button></Link>
        </div>
      </div>
    )
  }
}

export default Login;