import React, { Component } from 'react';

class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  render() {
    return (
      <div id="userProfile">
        <h3>User Profile Page</h3>
        <div class="row">
          <form class="col s12">

            <div class="row">
              <div class="input-field col s6">
                <input id="first_name" type="text" class="validate"/>
                <label for="first_name">First Name</label>
              </div>

              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate"/>
                <label for="last_name">Last Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input id="address" type="text" class="validate"/>
                <label for="address">Address</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input id="dogname" type="text" class="validate"/>
                <label for="dogname">Dog Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input id="dogbio" type="text" class="validate"/>
                <label for="dogbio">Dog Bio</label>
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