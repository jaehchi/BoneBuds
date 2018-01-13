import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1">
        <Link to="/"><span className="left brand-logo"><i className="material-icons"></i>Coffee Meets Fido</span></Link>
          <ul className="right">
            <li><Link to='/userEvents'><i className="material-icons">event</i></Link></li>
            <li><Link to='/createEvent'><i className="material-icons">fingerprint</i></Link></li>
            <li><Link to="/"><i className="material-icons">location_on</i></Link></li>
            <li><Link to="/userpage"><i className="material-icons">face</i></Link></li>
            <li><a href="#!" onClick={this.props.logout}>Logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;