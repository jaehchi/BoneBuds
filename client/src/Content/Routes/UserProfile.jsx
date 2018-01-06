import React, { Component } from 'react';

export class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  render() {
    console.log('user profile page clicked')
    return (
      <div>
        <h1>User Profile Page</h1>
      </div>
    )
  }
}