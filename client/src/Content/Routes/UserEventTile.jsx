import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserEventTile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      eventInfo: '',
    }
    this.identifyEvent = this.identifyEvent.bind(this);
  }

  identifyEvent() {
    this.props.identifyEvent(this.props.event.eventID);
  }

  render () {
    return (
      <div className="wrapper">
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src="https://rs1107.pbsrc.com/albums/h398/DMNYK1000/LevyTran.gif~c200"/>
            <Link to='/editEvent' className="btn-floating halfway-fab waves-effect waves-light red" onClick={this.identifyEvent}><i className="material-icons">edit</i></Link>
          </div>
          <div className="card-content">
            <h5><strong>{this.props.event.title}</strong></h5>
            <p>{this.props.event.description} I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    </div>


    )
  }
}

export default UserEventTile;

