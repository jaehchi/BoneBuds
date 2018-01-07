import React, { Component } from 'react';
import Comment from './Comment';

class Post extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        hi from post
        <Comment/>
      </div>
    )
  }
}

export default Post;