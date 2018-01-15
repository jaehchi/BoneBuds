import React, { Component } from "react";
import EventTile from "./EventTile.jsx";

class Events extends Component {
  constructor() {
    super();
  }

  render() {
    let sortedEvents = this.props.events.sort((a, b) => {
      return b.likes - a.likes;
    })
    return (
      <div className="scrollable">
        {sortedEvents.map(event => {
          return (
            <EventTile
              key={event.eventID}
              id={event.eventID}
              value={event.eventID}
              event={event}
              likes={event.likes}
              click={this.props.click}
            />
          );
        })}
      </div>
    );
  }
}

export default Events;
