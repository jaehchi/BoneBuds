import React, { Component } from 'react';
import axios from 'axios';

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: '',
      title: '',
      date: '',
      time: '',
      owner: '',
      latitude: '',
      longitude: '',
      description: '',
      tag: '',
      image: '',
      events: [],
      eventsWereLoaded: false,
    }
    // this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillMount() {
    if (this.state.eventsWereLoaded === false) {
      axios.get('/events/fetchUsersEventsData/' + this.state.owner)
        .then((res) => {
          console.log('Pre-fetching event data... \nServer response:', res)
          this.setState({
            events: res,
            eventsWereLoaded: true,
          })
        })
        .catch((e) => {
          console.error('Could not fetch event data...', e);
        })
    }
  }

  render() {
    return (
      <div id="editEvent">
        <h1 className="header center teal-text text-lighten-2">Edit Event Page</h1>
        <button>Show State</button>
        <button>Select</button>

        <div className="row">

          <div className="col s4">
            <select>
              <option value="1">Coffee Meets Fido</option>
              <option value="2">Paint Your Dog</option>
              <option value="3">Long Beach Grand Prix</option>
            </select>
            <label>Select Event To Edit</label>
          </div>

          <div className="col s7 offset-s1">
            <form>
                <div className="input-field">
                  <input
                    placeholder={this.state.title}
                    name="eventname"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="eventname">Event Name</label>
                </div>
            </form>
          </div>

        </div>
      </div>
    )
  }
}