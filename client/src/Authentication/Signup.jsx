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
              username: this.state.username,
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
                console.error('error signing up user in sql db after firebase email auth');
              })
          }
        })
      })
      .catch(() => {
        console.error('error creating user in firebase email signup');
      })
  }
  render() {
    return (
      <div  className="scrollable">
        <h4 className="header center teal-text text-lighten-2">User Signup</h4>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder={this.state.username}
                  name="username"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                />
                <label data-success="Super original username! Babes will love you now." data-error="Username Required, Idiot!" htmlFor="username" className="active">User Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.email}
                  name="email"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                  
                />
                <label data-error="Email Required, Idiot!" htmlFor="email" className="active">Email</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.password}
                  name="password"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.password}
                  required
                  
                />
                <label data-error="Password Required, Idiot!" htmlFor="password" className="active">Password</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.firstname}
                  name="firstname"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.firstname}
                  required
                  
                />
                <label data-success="Your parents named you that? Tough break." data-error="First Name Required, Idiot!" htmlFor="firstname" className="active">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  placeholder={this.state.lastname}
                  name="lastname"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.lastname}
                  required
                  
                />
                <label data-error="Last Name Required, Idiot!" htmlFor="lastname" className="active">Last Name</label>
              </div>
            </div>


            <div className="input-field col s6">
              <input
                placeholder='Insert link to profile url'
                name="profileUrl"
                type="text"
                className="validate"
                onChange={this.handleChange}
                value={this.state.profileUrl}
                
              />
              <label htmlFor="profileUrl" className="active">Profile Image</label>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder={this.state.address}
                  name="address"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.address}
                />
                <label htmlFor="address" className="active">Address</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s3">
                <input
                  placeholder={this.state.dogname}
                  name="dogname"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.dogname}
                />
                <label htmlFor="dogname" className="active">Dog Name</label>
              </div>
              <div className="input-field col s3">
                <input
                  placeholder={this.state.dogbio}
                  name="dogbio"
                  type="text"
                  className="materialize-textarea"
                  onChange={this.handleChange}
                  value={this.state.dogbio}
                ></input>
                <label htmlFor="dogbio" className="active">Dog Bio</label>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Link to="/"><button className="teal-text text-lighten-2 emailBtn" onClick={this.emailSignup}>Sign Up!</button></Link>
        </div>
      </div>
    )
  }
}

export default Signup;