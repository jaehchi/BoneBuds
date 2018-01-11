import React, { Component } from 'react';
import axios from 'axios';
import firebase, { auth, facebookProvider, googleProvider } from './firebase.js';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    )
  }
}

export default Signup;