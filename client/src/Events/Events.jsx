import React, { Component } from 'react';
import EventTile from './EventTile.jsx';

class Events extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="col s3">
        <EventTile/>
        <EventTile/>
        <EventTile/>
      </div>
    )
  }
}

export default Events;