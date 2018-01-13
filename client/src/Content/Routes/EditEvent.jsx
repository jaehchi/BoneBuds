import React, { Component } from 'react';
import axios from 'axios';

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
    this.showState = this.showState.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitEventUpdate = this.submitEventUpdate.bind(this);
    this.getUserEventInfo = this.getUserEventInfo.bind(this);
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

  showState() {
    this.setState({
      eventID: this.props.currentEvent.eventID,
    })
    console.log(this.state, 'current state');
  }


  submitEventUpdate() {
    const payload = {
      event: this.state,
      id: this.props.currentEvent.eventID,
    }
    axios.post('/events/updateEventInfo', payload)
  }

  render() {
    if (this.state.eventID === 'undefined') {
      this.getUserEventInfo(this.props.currentEvent.eventID);
    }
    return (
      <div id="editEvent">
        <h1 className="header center teal-text text-lighten-2">Editing: {this.props.currentEvent.title}</h1>
        <button onClick={this.showState}>Show State</button>
        <button onClick={this.submitEventUpdate}>Update Event</button>

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