import React, { Component } from 'react';
import Post from '../Post';
import axios from 'axios';


class EventProfile extends Component {
  constructor (props) {
    super(props);

  }

  render () {

    return (
      <div id="eventProfile">
      <h5>{this.props.event.title}</h5>
      { this.props.posts.map( post => {
        return ( <Post postID={post.postID} post={post}/> );
      })}
      </div>
    )
  }
}

export default EventProfile;