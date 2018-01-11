import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import path from 'path';
import UserProfile from './UserProfile';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
      dogname: '',
      dogbio: '',
      profileUrl: '',
    }
    this.consoleState = this.consoleState.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }
  componentWillMount() {
    // console.log(this.props.currentUser)
    axios.get('/users/update/' + this.props.currentUser.uid)
      .then((res) => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          address: res.data.address,
          dogname: res.data.dogname,
          dogbio: res.data.dogbio,
          profileUrl: res.data.profileUrl,
        })
        console.log('Pre-fetched user info:', res.data)
      })
  }

  consoleState() {
    console.log('info being sent to db:', this.state)
    console.log('passed down props:', this.props.currentUser)
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateUserInfo() {
    const payload = {
      info: this.state,
      email: this.props.currentUser.email,
    }
    axios.post('/users/update', payload)
      .then((response) => {
        console.log('User data sent to db for update. \nServer response:', response)
      })
      .catch((e) => {
        console.log('User data was not sent to db for update', e)
      })
  }

  render() {
    let profilePic = '';
    if (this.state.profileUrl) {
      profilePic = this.state.profileUrl
    } else if (this.props.currentUser.photoURL) {
      profilePic = this.props.currentUser.photoURL;
    } else {
      profilePic = (path.resolve(__dirname, '/logo.png'))
    }
    return (
      <div id="userPage">
        <img id="profPic" src={profilePic} />
        <div>Username: {this.state.firstname} {this.state.lastname}</div>
        <div>Dog: {this.state.dogname}</div>
        <div>Dog Bio: {this.state.dogbio}</div>
        <Link to="userprofile"><i>Edit Profile</i></Link>
      </div>
    )
  }
}

export default UserPage;