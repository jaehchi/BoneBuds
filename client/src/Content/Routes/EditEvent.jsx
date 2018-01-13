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
      console.log(this.props, 'event id');
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
        <h1 className="header center teal-text text-lighten-2">Edit Event</h1>
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
                  <i className="material-icons prefix">title</i>
                  <input
                    placeholder={this.state.title}
                    name="eventname"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="eventname">Event Title</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">description</i>
                  <input
                    placeholder={this.state.title}
                    name="description"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="description">Description</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">map</i>
                  <input
                    placeholder={this.state.title}
                    name="location"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="location">Location</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">image</i>
                  <input
                    placeholder={this.state.title}
                    name="image"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="image">Image Url</label>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">gesture</i>
                  <input
                    placeholder={this.state.title}
                    name="tags"
                    type="text"
                    className="validate"
                    onChange={this.onChangeHandler}
                  />
                  <label htmlFor="tags">Tags</label>
                </div>

            </form>
          </div>

        </div>
      </div>
    )
  }
}