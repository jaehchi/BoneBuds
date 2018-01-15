import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: '',
      title: '',
      date: '',
      time: '',
      owner: '',
      description: '',
      tag: '',
      location: '',
      image: '',
      events: [],
      currentEvent: '',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyup = this.onKeyUp.bind(this);
    this.submitEventUpdate = this.submitEventUpdate.bind(this);
    this.getUserEventInfo = this.getUserEventInfo.bind(this);
    this.showToast = this.showToast.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.sweetAlert = this.sweetAlert.bind(this);
  }

  componentWillMount() {
    // gets specific information for event
    this.getUserEventInfo(this.props.currentEvent.eventID);
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

  onKeyUp(e) {
    if (e.keyCode === 13) {
      const payload = {
        event: this.state,
        id: this.props.currentEvent.eventID,
      }
      axios.put('/events/updateEventInfo', payload)
        .then((res) => {
          console.log("Event was updated. Server response:", res.data);
          this.showToast('message');
        })
        .catch((e) => {
          console.log('Event was not updated', e);
          this.showToast('error');
        })
    }
  }

  showToast(message) {
    if (message === 'message') {
      Materialize.toast('Event Info Updated!', 3000, 'rounded');
    } else if (message === 'error') {
      Materialize.toast('DENIED!', 3000, 'rounded');
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
        this.showToast('message');
      })
      .catch((e) => {
        console.log('Event was not updated', e);
        this.showToast('error');
      })
  }

  sweetAlert() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.get('/events/deleteEvent/' + this.props.currentEvent.eventID)
          .then((res) => {
            console.log('Event has beed deleted. \nServer response:', res.data);
            swal("Poof! Your event has been deleted!", {
              icon: "success",
            });
          })
          .catch((e) => {
            console.log('Event was not deleted', e);
          })

      } else {
        swal("Your event is safe!");
      }
    });
  }

  render() {
    return (
      <div id="editEvent">

        {/* event title and buttons */}
        <div className="row">
          <h1 className="header center blue-text text-darken-4">{this.props.currentEvent.title}</h1>
        </div>
        <div className="center-align">
          <Link to="/userEvents" className="waves-effect waves-light btn" onClick={this.sweetAlert}><i className="material-icons left">delete</i>Delete Event</Link>
          <Link to="/userEvents" className="waves-effect waves-light btn" onClick={this.submitEventUpdate}><i className="material-icons left">create</i>Update Event</Link>
        </div>
        {/* end of event title and buttons */}

        {/* event selector */}
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
          {/* end of event selector */}

          {/* Edit event form */}
          <div className="col s7 offset-s1 z-depth-2 hoverable">
            <form>

                {/* title */}
                <div className="input-field">
                  <i className="material-icons prefix">title</i>
                  <input
                    placeholder={this.props.currentEvent.title}
                    name="title"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyup}
                  />
                  <label htmlFor="eventname" className="active">Event Title</label>
                </div>

                {/* description */}
                <div className="input-field">
                  <i className="material-icons prefix">description</i>
                  <input
                    placeholder={this.props.currentEvent.description}
                    name="description"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyup}
                  />
                  <label htmlFor="description" className="active">Description</label>
                </div>

                {/* location */}
                <div className="input-field">
                  <i className="material-icons prefix">map</i>
                  <input
                    placeholder={this.props.currentEvent.location}
                    name="location"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyup}
                  />
                  <label htmlFor="location" className="active">Location</label>
                </div>

                {/* image */}
                <div className="input-field">
                  <i className="material-icons prefix">image</i>
                  <input
                    name="image"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyup}
                  />
                  <label htmlFor="image" className="active">Image Url</label>
                </div>

                {/* tags */}
                <div className="input-field">
                  <i className="material-icons prefix">gesture</i>
                  <input
                    placeholder={this.props.currentEvent.tag}
                    name="tag"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyup}
                  />
                  <label htmlFor="tag" className="active">Tags</label>
                </div>

            </form>
          </div>
          {/* end of Edit Event Form */}

        </div>
      </div>
    )
  }
}