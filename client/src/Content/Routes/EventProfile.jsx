import React, { Component } from 'react';
import Post from '../Post'


class EventProfile extends Component {
  constructor () {
    super();

    this.state = {
      posts: []
    }
  }
  componentDidMount () {
    
  }

  render () {
    console.log(this.state, 'props')
    return (
      <div id="eventProfile">
      it worked fucker
        <Post/>
      </div>
    )
  }
}

export default EventProfile;