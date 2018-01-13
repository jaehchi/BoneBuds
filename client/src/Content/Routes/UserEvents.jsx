import React, { Component } from "react";
import UserEventTile from "./UserEventTile.jsx";
import axios from 'axios'

class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    const socket = this.props.socket;
    const userID = this.props.user.uid;
    const payload = {
      userID: this.props.user.uid
    }

    socket.on(`eventsByUser ${userID}`, eventsByUser => {
      this.setState({
        events: eventsByUser
      });
    });

    axios.post('/events/fetchEventsByUser', payload)
      .then(response => {
        console.log('Pre-fetching event data... \nServer response:', response.data);
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    // this.props.user.uid works
    return (
      <div className="wrapper">
        <div className="scrollable">
          {this.state.events.map((event, index) => {
            return (
              <UserEventTile event={event} key={index}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserEvents;
