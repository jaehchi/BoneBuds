import React, { Component } from "react";
import UserEventTile from "./UserEventTile.jsx";

class UserEvents extends Component {
  constructor() {
    super();
  }

  render() {
    console.log('props for userEvents', this.props);
    return (
      <div className="scrollable">
        {/* {this.props.events.map(event => { */}
          {/* return ( */}
            <UserEventTile/>
          {/* ); */}
        {/* })} */}
      </div>
    );
  }
}

export default UserEvents;
