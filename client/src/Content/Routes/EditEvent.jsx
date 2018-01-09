import React, { Component } from 'react';
import axios from 'axios';

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
    }
  }
  render() {
    return (
      <div id="editEvent">
        <h1 className="header center teal-text text-lighten-2">Edit Event Page</h1>
      </div>
    )
  }
}