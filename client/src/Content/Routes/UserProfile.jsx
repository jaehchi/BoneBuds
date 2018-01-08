import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      address: null,
      dogname: null,
      dogbio: null,
    }
    this.consoleState = this.consoleState.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  consoleState() {
    console.log('info being sent to db:', this.state)
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateUserInfo() {
    const payload = {
      info: this.state,
    }
    axios.post('/users/update', payload)
      .then((response) => {
        console.log('User data sent to db for update. Server response:', response)
      })
      .catch((e) => {
        console.log('User data was not sent to db for update', e)
      })
  }

  render() {
    return (
      <div id="userProfile">
        <h3>User Profile Page</h3>
        <button onClick={this.consoleState}>Show State</button>
        <button onClick={this.updateUserInfo}>Update user info</button>
        <div className="row">
          <form className="col s12">

            <div className="row">
              <div className="input-field col s6">
                <input
                  name="firstname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  name="lastname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="address"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="dogname"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="dogname">Dog Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="dogbio"
                  type="text"
                  className="validate"
                  onChange={this.onChangeHandler}
                />
                <label htmlFor="dogbio">Dog Bio</label>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default UserProfile;

// <div class="row">
//   <div class="input-field col s12">
//     <input id="email" type="email" class="validate"/>
//     <label for="email" data-error="enter a valid password" data-success="Success!">Email</label>
//   </div>
// </div>