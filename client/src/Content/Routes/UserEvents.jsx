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
      console.log('Users events in Socket', eventsByUser);
      this.setState({
        events: eventsByUser
      });
    });

    axios.post('/events/fetchEventsByUser', payload)
      .then(response => {
        console.log('post to events/fetchEventByUser', response.data);
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    console.log('props for userEvents', this.props.user.uid);
    return (
      <div className="scrollable">
        {this.state.events.map((event, index) => {
          return (
            <UserEventTile event={event} key={index}/>
          );
        })}
      </div>
    );
  }
}

export default UserEvents;
