import React, { Component } from "react";
import UserEventTile from "./UserEventTile.jsx";
import axios from 'axios'

class UserEvents extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    }
  }

  componentDidMount () {
    const socket = this.props.socket;

    const userID = this.props.user.uid;

    const payload = {
      userID: userID
    }

    socket.on(`eventsByUser ${userID}`, eventsByUser => {
      console.log('Users events in Socket', eventsByUser);
      this.setState({
        events: eventsByUser
      });
    });
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
        {this.state.events.map(event => {
          return (
            <UserEventTile event={event}/>
          );
        })}
      </div>
    );
  }
}

export default UserEvents;
