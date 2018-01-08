import React, { Component } from 'react';
import EventTile from './EventTile.jsx';

class Events extends Component {
  constructor () {
    super();
  }

  render () {
    console.log('event props' , this.props);
    return (
      <div className="scrollable">
        {
          this.props.events.map( event => {
            return <EventTile key={event.eventID} id={event.eventID} event={event}/>
        })
        }
      </div>
    )
  }
}

export default Events;