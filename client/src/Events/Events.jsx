import React, { Component } from 'react';
import EventTile from './EventTile.jsx';

class Events extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <EventTile/>
        <EventTile/>
        <EventTile/>
        <EventTile/>
        <EventTile/>
        <EventTile/>
      </div>
    )
  }
}

export default Events;