import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: '',
      dogname: '',
      dogbio: '',
      profileUrl: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.emailSignup = this.emailSignup.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }
  emailSignup() {
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log(user);
            const usersRef = firebase.database().ref('users');
            const dbUser = {
              username: user.email,
              email: user.email
            }
            const payload = {
              userId: user.uid,
              username: this.state.username,
              email: this.state.email,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              address: this.state.address,
              dogname: this.state.dogname,
              dogbio: this.state.dogbio,
              profileUrl: this.state.profileUrl
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
          }
        })
      })
      .catch(() => {
        console.error('error creating user');
      })
  }
  render() {
    return (
      <div>
        <div id="signupForm">
          Username:
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
          Email:
          <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
          Password:
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
          Firstname:
          <input type="text" name="firstname" onChange={this.handleChange} value={this.state.firstname} />
          Lastname:
          <input type="text" name="lastname" onChange={this.handleChange} value={this.state.lastname} />
          Address:
          <input type="text" name="address" onChange={this.handleChange} value={this.state.address} />
          Your Dog's Name:
          <input type="text" name="dogname" onChange={this.handleChange} value={this.state.dogname} />
          Your Dog's Bio:
          <input type="text" name="dogbio" onChange={this.handleChange} value={this.state.dogbio} />
          Profile Pic Url:
          <input type="text" name="profileUrl" onChange={this.handleChange} value={this.state.profileUrl} />
        </div>
        <button className="signupButton" onClick={this.emailSignup}>Sign Up!</button>
      </div>
    )
  }
}

export default Signup;