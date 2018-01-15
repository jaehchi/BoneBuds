import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
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
        console.error('error validating user with email and password');
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
          username: user.displayName,
          email: user.email
        }
        const payload = {
          username: user.email,
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
            console.error('error signing up user in google login');
          })
      });
  }
  render() {
    return (
      <div className="card card-panel hoverable sticky-action" id="loginLanding">
        <h4 className="header center blue-text text-darken-4">Login</h4>
        <div className="emailLogin">
          <div className="row">
            <div className="input-field col s12">
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
          </div>
          <div className="row">
            <div className="input-field col s12 password">
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
          </div>
        </div>
        <div className="row">
          <button className="waves-effect waves-light btn emailBtn" type="submit" value="Login" onClick={this.emailLogin}><span className="button__inner">LogIn</span> </button>
        </div>
        <div className="row">
          <button className="loginBtn loginBtn--google" onClick={this.googleLogin}>Log In with Google</button>
        </div>
        <br />
        <div>
          <Link to="/signup"><button className="waves-effect waves-light btn emailBtn">Not a user? Sign Up!</button></Link>
        </div>

      </div>
    )
  }
}
{/* <div className="loginLanding card card-panel sticky-action">
<div >
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
</div> */}

export default Login;