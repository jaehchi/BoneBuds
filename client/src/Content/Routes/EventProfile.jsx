import React, { Component } from 'react';
import Post from '../Post';
import axios from 'axios';


class EventProfile extends Component {
  constructor () {
    super();

    this.state = {
      event: {
        data: []
      },
      posts: []
    }
  }

  render () {
  
    return (
      <div id="eventProfile">
      <h5>{this.props.event.title}</h5>
        <Post/>
      </div>
    )
  }
}

export default EventProfile;