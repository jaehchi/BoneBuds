import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventTile extends Component {
  constructor () {
    super();

    this.showToast = this.showToast.bind(this);
    // this.onClick = this.onClick.bind(this);
  }
  showToast() {
    Materialize.toast('Event Added!', 3000, 'rounded')
  }

  // onClick () {
  //   console.log(this.props.event.eventID)
  // }

  render () {
    console.log(this.props)
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
          <Link to="/eventprofile" id={this.props.event.eventID}>View</Link>
          <a onClick={this.showToast}>Attend</a>
        </div>

      {/*<div className="card card-panel hoverable sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="https://www.banfflakelouise.com/sites/default/files/moraine-lake-photographer-banff-alberta_0.jpeg"/>
        </div>

        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">Outdoor Photograph Lessons<i className="material-icons right">more_vert</i></span>
        </div>

        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
          <p>90's letterpress stumptown, cliche chicharrones cold-pressed cloud bread skateboard tumeric pok pok. Knausgaard biodiesel polaroid ethical, brooklyn gentrify cronut migas.
          <br /><br />
          Art party letterpress taiyaki try-hard, gentrify retro tumblr heirloom narwhal.
          </p>
        </div>

        <div className="card-action">
          <a>View</a>
          <a onClick={this.showToast}>Attend</a>
        </div>
    </div>*/}
    </div>
    )
  }
}

export default EventTile;

