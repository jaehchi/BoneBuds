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
      <div>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">title</i>
                <input id="icon_prefix" type="text" class="validate" data-length="25"/>
                <label for="icon_prefix">Event Title</label>
              </div>
            </div>

          {/* <form class="col s12"> */}
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">description</i>
                <textarea id="textarea1" class="materialize-textarea" data-length="120"></textarea>
                <label for="textarea1">Description</label>
              </div>
            </div>
          {/* </form> */}
            <div class="row">  
              <div id="date-picker" class="section scrollspy col s6">
              <i class="material-icons prefix">date_range</i>
                <label for="eventdate">Event Date</label>
                <input id="eventdate" type="text" class="datepicker"/>
              </div>
            </div>
            <div class="row">  
              <div id="time-picker" class="section scrollspy col s6">
              <i class="material-icons prefix">access_time</i>
                <label for="eventtime">Event Time</label>
                <input id="eventtime" type="text" class="timepicker"/>
              </div> 
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent;
