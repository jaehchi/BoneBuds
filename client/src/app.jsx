import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Content/MapContainer'
import Nav from './Authentication/Nav';
import Events from './Events/Events';
import Login from './Authentication/Login';
import LoginLanding from './Authentication/LoginLanding';
import firebase, { auth } from './Authentication/firebase';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      users: [],
      user: null
    }
    this.handleUserToken = this.handleUserToken.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
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
  handleUserToken() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
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
    const style = {
      padding: 0,
      margin: 0,
    }
    return (
      <div>
        {!this.state.user ?
          <LoginLanding handleUserToken={this.handleUserToken} handleLogin={this.handleLogin} />
          :
          <div>
            <Nav logout={this.logout}/>
            <h3>Welcome, {this.state.user.displayName}</h3>
            <div className="container" style={style}>
              <div className="row">
                <div className="col s3" >
                  <Events />
                </div>
                <div className="col s9">
                  <MapContainer />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;