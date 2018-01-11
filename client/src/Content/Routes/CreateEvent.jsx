import React, { Component } from "react";
import axios from "axios";

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
      image: '',
      userID: '',
      owner: '',
      ownerUrl: ''
    };
    this.consoleState = this.consoleState.bind(this);
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
    console.log(this.props.owner, 'need to set owner as username')
    this.setState({
      owner: '',
      userID: this.props.owner.uid,
      ownerUrl: this.props.userData.profileUrl
    })
  }

  consoleState() {
    console.log("info being sent to database:", this.state);
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showToast() {
    Materialize.toast("Event created!", 3000, "rounded");
  }

  createEvent() {
    const payload = {
      info: this.state
    };
    axios
      .post("/events/createEvent", payload)
      .then(res => {
        console.log("Creating event... \nServer response:", res.data);
        this.showToast();
      })
      .catch(e => {
        console.log("Event data was not created", e);
      });
  }

  render() {
    return (
      <div className="row scrollable">
        <button onClick={this.consoleState}>Console State</button>
        <button onClick={this.createEvent}>Submit Changes</button>

        <form className="col s12">
          <div className="row">
            <h1 className="header center teal-text text-lighten-2">
              Create an Event!
            </h1>
          </div>

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
              <label htmlFor="icon_prefix" className="active">Event Title</label>
            </div>
          </div>

          {/* <form className="col s12"> */}
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">description</i>
              <textarea
                name="description"
                id="textarea1"
                className="materialize-textarea"
                data-length="120"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="textarea1" className="active">Description</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">map</i>
              <input
                name="location"
                id="icon_prefix"
                type="text"
                className="validate"
                data-length="25"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix" className="active">Location</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">image</i>
              <input
                name="image"
                id="icon_prefix"
                type="text"
                className="validate"
                data-length="255"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix" className="active">Image Url</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">gesture</i>
              <input
                name="tag"
                id="icon_prefix"
                type="text"
                className="validate"
                data-length="25"
                onChange={this.onChangeHandler}
              />
              <label htmlFor="icon_prefix">Tags</label>
            </div>
          </div>
          {/* </form> */}
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
        </form>
      </div>
    );
  }
}

export default CreateEvent;
