import React, { Component } from 'react';
import EventTile from './EventTile.jsx';

class Events extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="scrollable">
        <EventTile/>
        <EventTile/>
        <EventTile/>
      </div>
    )
  }
}

export default Events;