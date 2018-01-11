import React, { Component } from "react";
import UserEventTile from "./UserEventTile.jsx";
import axios from 'axios'

class UserEvents extends Component {
  constructor() {
    super();
  }

  componentDidMount () {
    const userID = this.props.user.uid;
    const payload = {
      userID: userID
    }
    console.log('payload', payload)

    axios.post('/events/fetchEventsByUser', payload)
      .then( response => {
        console.log('herrro' ,response);
      })
      .catch( err => {
        console.log(err);
      })

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
