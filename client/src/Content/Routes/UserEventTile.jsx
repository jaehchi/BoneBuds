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
  componentDidMount() {
  }

  // passes up this specific event's ID
  // to render correct information
  identifyEvent() {
    this.props.identifyEvent(this.props.event.eventID);
  }

  render () {
    return (
      <div className="col s4">
        <div className="card hoverable">

          <div className="card-image">
            <img src={this.props.event.image}/>
            <Link to='/editEvent' className="btn-floating halfway-fab waves-effect waves-light red" onClick={this.identifyEvent}><i className="material-icons">edit</i></Link>
          </div>

          <div className="card-content">
            <h5><strong>{this.props.event.title}</strong></h5>
            <p>{this.props.event.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserEventTile;

