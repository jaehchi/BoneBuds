import React, { Component } from 'react';


class CreateEvent extends Component {
  constructor () {
    super();

    this.state = {

    }
  }
  componentDidMount () {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('.timepicker').pickatime({
      default: 'now', // Set default time
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });
  }

  onChange () {

  }

  render () {
    return (
        <div className="row scrollable">
          <form className="col s12">
            <div className="row">
              <h1 className="header center teal-text text-lighten-2">Create an Event!</h1>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">title</i>
                <input id="icon_prefix" type="text" className="validate" data-length="25"/>
                <label htmlFor="icon_prefix">Event Title</label>
              </div>
            </div>

          {/* <form className="col s12"> */}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">description</i>
                <textarea id="textarea1" className="materialize-textarea" data-length="120"></textarea>
                <label htmlFor="textarea1">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">gesture</i>
                <textarea id="textarea1" className="materialize-textarea" data-length="120"></textarea>
                <label htmlFor="textarea1">Tag</label>
              </div>
            </div>
          {/* </form> */}
            <div className="row">
              <div id="date-picker" className="section scrollspy col s12">
              <i className="material-icons prefix">date_range</i>
                <label htmlFor="eventdate">Event Date</label>
                <input id="eventdate" type="text" className="datepicker"/>
              </div>
            </div>
            <div className="row">
              <div id="time-picker" className="section scrollspy col s12">
              <i className="material-icons prefix">access_time</i>
                <label htmlFor="eventtime">Event Time</label>
                <input id="eventtime" type="text" className="timepicker"/>
              </div>
            </div>
          </form>
        </div>

    )
  }
}

export default CreateEvent;
