import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventTile extends Component {
  constructor () {
    super();

    this.state = {
      eventID: this.props
    }

    this.showToast = this.showToast.bind(this);
    this.eventClick = this.eventClick.bind(this);
  }

  showToast() {
    Materialize.toast('Event Added!', 3000, 'rounded')
  }

  eventClick () {
    this.props.click(this.props.id);
  }

  render () {
    return (

      <div className="card card-panel hoverable sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="https://www.banfflakelouise.com/sites/default/files/moraine-lake-photographer-banff-alberta_0.jpeg"/>
        </div>

        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{this.props.event.title}<i className="material-icons right">more_vert</i></span>
        </div>

        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{this.props.event.title}<i className="material-icons right">close</i></span>
          <p>{this.props.event.description}</p>
        </div>

        <div className="card-action">
          <Link to="/eventprofile" onClick={this.eventClick}>View</Link>
          <a onClick={this.showToast}>Attend</a>
        </div>
    </div>
    )
  }
}

export default EventTile;

