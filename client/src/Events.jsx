import React, { Component } from 'react';
import EventTile from './EventTile.jsx';

class Events extends Component {
  constructor () {
    super();
    
  }

  render () {

    return (
      <div>
        <div className="row">
          <EventTile/>
          <EventTile/>
          <EventTile/>
        </div>
        <div className="row">
          <EventTile/>
          <EventTile/>
          <EventTile/>
        </div>
      </div>
    )
  }
}

export default Events;