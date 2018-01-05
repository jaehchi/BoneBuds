import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      user: null,
    }
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      console.log(users);
      let newState = [];
      for (let user in users) {
        console.log(user);
        newState.push({
          id: users[user].uid,
          email: users[user].email,
          user: users[user].displayName
        });
      }
      this.setState({
        users: newState
      });
    })
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  googleLogin() {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        console.log(result.user.uid)
        const user = result.user;
        this.setState({
          user
        });
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
      });
  }
  facebookLogin() {
    auth.signInWithPopup(facebookProvider)
      .then((result) => {
        const usersRef = firebase.database().ref('users');
        console.log(result.user.uid)
        const user = result.user;
        this.setState({
          user
        });
        const dbUser = {
          userName: user.displayName,
          email: user.email
        }
        usersRef.child(user.uid).set(dbUser)
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
        alert('logout successful');
      });
  }
  render() {
    return (
      <div>
        {!this.state.user ?
          <div>
            <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>Log In with Google</button>
            <button className="loginBtn loginBtn--facebook" onClick={this.facebookLogin}>Log In with Facebook</button>
          </div>
          :
          <div>
            <h3>Welcome, {this.state.user.displayName}</h3>
            <button onClick={this.logout}>Logout</button>
          </div>
        }
      </div>
    )
  }
}

export default Login;