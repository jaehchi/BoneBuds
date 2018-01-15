import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tag: '',
      location: '',
      date: '',
      time: '',
      image: '/logo.svg',
      userID: '',
      owner: '',

    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showToast = this.showToast.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  componentDidMount() {
    $(".datepicker").pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $(".timepicker").pickatime({
      default: "now", // Set default time
      fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: "OK", // text for done-button
      cleartext: "Clear", // text for clear-button
      canceltext: "Cancel", // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function() {} //Function for after opening timepicker
    });
  }

  componentWillMount() {
    this.setState({
      owner: this.props.userData.username,
      userID: this.props.owner.uid,
    })
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showToast(response) {
    if (response === 'good') {
      Materialize.toast('Event created!', 3000, 'rounded');
    } else {
      Materialize.toast('Error... Event was not created', 3000, 'rounded');
    }
  }

  createEvent() {
    const payload = {
      info: this.state
    };
    axios
      .post("/events/createEvent", payload)
      .then(res => {
        console.log("Creating event... \nServer response:", res.data);
        if (res.data === 'Invalid API Request') {
          this.showToast();
        } else {
          this.showToast('good')
        }
      })
      .catch((e) => {
        console.log("Event data was not created. Invalid api request.", e);
      });
  }

  render() {
    return (

      <div className="card card-panel hoverable scrollable" id="createEvent">

        {/* Title and buttom */}
        <div className="row">
          <h1 className="header center blue-text text-darken-4">Create an Event!</h1>
        </div>

        <div className="center-align">
          <Link to='/userEvents' onClick={this.createEvent} className="waves-effect waves-light btn"><i className="material-icons left">event_note</i>Create Event</Link>
        </div>
        {/* end of Title and buttom */}

          {/* Title form */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">title</i>
              <input
                name="title"
                id="icon_prefix"
                type="text"
                className="validate"
                data-length="25"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix" className="active" data-error="Event title too long!" data-success="WOW! Much Creative!">Event Title</label>
            </div>
          </div>

          {/* description */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">description</i>
              <textarea
                name="description"
                id="textarea1"
                className="materialize-textarea"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="textarea1" className="active">Description</label>
            </div>
          </div>

          {/* location */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">map</i>
              <input
                name="location"
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix" className="active">Location</label>
            </div>
          </div>

          {/* image */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">image</i>
              <input
                name="image"
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix" className="active">Image Url</label>
            </div>
          </div>

          {/* tags */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">gesture</i>
              <input
                name="tag"
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix">Tags</label>
            </div>
          </div>

          {/* date */}
          <div className="row">
            <div className="col s6">
              <div id="date-picker" className="section scrollspy col s12">
                <i className="material-icons prefix">date_range</i>
                <label htmlFor="eventdate">Event Date</label>
                <input
                  name="date"
                  id="eventdate"
                  type="text"
                  className="datepicker"
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>

            {/* time */}
            <div className="col s6">
              <div id="time-picker" className="section scrollspy col s12">
                <i className="material-icons prefix">access_time</i>
                <label htmlFor="eventtime">Event Time</label>
                <input
                  name="time"
                  id="eventtime"
                  type="text"
                  className="timepicker"
                  onChange={this.onChangeHandler}
                />
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default CreateEvent;
