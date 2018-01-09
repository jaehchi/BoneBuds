import React, { Component } from "react";
import EventTile from "./EventTile.jsx";

class Events extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="scrollable">
        {this.props.events.map(event => {
          return (
            <EventTile
              key={event.eventID}
              id={event.eventID}
              value={event.eventID}
              event={event}
              click={this.props.click}
            />
          );
        })}
      </div>
    );
  }
}

export default Events;
