import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: 'undefined',
      title: '',
      date: '',
      time: '',
      owner: '',
      description: '',
      tag: '',
      image: '',
      events: [],
      currentEvent: '',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitEventUpdate = this.submitEventUpdate.bind(this);
    this.getUserEventInfo = this.getUserEventInfo.bind(this);
    this.showToast = this.showToast.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent() {
    axios.get('/events/deleteEvent/' + this.props.currentEvent.eventID)
      .then((res) => {
        console.log('Event has beed deleted. \nServer response', res.data);
        this.showToast('delete')
      })
      .catch((e) => {
        console.log('Event was not deleted', e);
      })
  }

  getUserEventInfo(id) {
    const payload = {
      eventID: id,
    }
    axios.post('/events/fetchByEventID', payload)
      .then((res) => {
        this.setState({
          eventID: res.data.eventID,
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          owner: res.data.owner,
          image: res.data.image,
          tag: res.data.tag,
        })
      })
      .catch((e) => {
        console.log('Client did not recieve their events data', e)
      })
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  showToast(a) {
    if (a === 'update') {
      Materialize.toast('Event Info Updated!', 3000, 'rounded');
    }
    if (a === 'delete') {
      Materialize.toast('Event DELETED!', 3000, 'rounded');
    }
  }

  submitEventUpdate() {
    const payload = {
      event: this.state,
      id: this.props.currentEvent.eventID,
    }
    axios.put('/events/updateEventInfo', payload)
      .then((res) => {
        console.log("Event was updated. Server response:", res.data);
        this.showToast('update');
      })
      .catch((e) => {
        console.log('Event was not updated', e);
      })
  }

  render() {
    if (this.state.eventID === 'undefined') {
      this.getUserEventInfo(this.props.currentEvent.eventID);
    }
    return (
      <div id="editEvent">
        <h1 className="header center teal-text text-lighten-2">Editing: {this.props.currentEvent.title}</h1>

        <Link to="/userEvents" className="waves-effect waves-light btn" onClick={this.deleteEvent}><i className="material-icons left">delete</i>Delete Event</Link>

        <Link to="/userEvents" className="waves-effect waves-light btn" onClick={this.submitEventUpdate}><i className="material-icons left">create</i>Update Event</Link>

        <div className="row">

          <div className="col s4">
            <select>
              {
                this.props.events
                  .filter(event => {
                    return event.owner === this.state.owner && event.eventID !== this.state.eventID;
                  })
                  .map((match, index) => (
                    <option key={index} value={match.eventID}>{match.title}</option>
                    )
                  )
              }
            </select>
            <label>Select Event To Edit</label>
          </div>

          <div className="col s7 offset-s1">
            <form>

                <div className="input-field">
                  <i className="material-icons prefix">title</i>
                  <input
                    placeholder={this.props.currentEvent.title}
                    name="title"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="eventname" className="active">Event Title</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">description</i>
                  <input
                    placeholder={this.props.currentEvent.description}
                    name="description"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="description" className="active">Description</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">map</i>
                  <input
                    placeholder={this.props.currentEvent.location}
                    name="location"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="location" className="active">Location</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">image</i>
                  <input
                    name="image"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="image" className="active">Image Url</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">gesture</i>
                  <input
                    placeholder={this.props.currentEvent.tag}
                    name="tag"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="tag" className="active">Tags</label>
                </div>

            </form>
          </div>

        </div>
      </div>
    )
  }
}