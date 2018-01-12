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
      <div id="userProfile" className="scrollable">
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
                />
                <label htmlFor="username" className="active">User Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.email}
                  name="email"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <label htmlFor="email" className="active">Email</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.password}
                  name="password"
                  type="password"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                <label htmlFor="password" className="active">Password</label>
              </div>
              <div className="input-field col s6">
                <input
                  placeholder={this.state.firstname}
                  name="firstname"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.firstname}
                />
                <label htmlFor="firstname" className="active">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  placeholder={this.state.lastname}
                  name="lastname"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.state.lastname}
                />
                <label htmlFor="lastname" className="active">Last Name</label>
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
          <Link to="/"><button onClick={this.emailSignup}>Sign Up!</button></Link>
        </div>
      </div>
      // <div>
      //   <div className="signupForm">
      //     Username:
      //     <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
      //     Email:
      //     <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />
      //     Password:
      //     <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
      //     Firstname:
      //     <input type="text" name="firstname" onChange={this.handleChange} value={this.state.firstname} />
      //     Lastname:
      //     <input type="text" name="lastname" onChange={this.handleChange} value={this.state.lastname} />
      //     Address:
      //     <input type="text" name="address" onChange={this.handleChange} value={this.state.address} />
      //     Your Dog's Name:
      //     <input type="text" name="dogname" onChange={this.handleChange} value={this.state.dogname} />
      //     Your Dog's Bio:
      //     <input type="text" name="dogbio" onChange={this.handleChange} value={this.state.dogbio} />
      //     Profile Pic Url:
      //     <input type="text" name="profileUrl" onChange={this.handleChange} value={this.state.profileUrl} />
      //     <div>
      //       <Link to="/"><button onClick={this.emailSignup}>Sign Up!</button></Link>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default Signup;