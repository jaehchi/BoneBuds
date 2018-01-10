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
          <a href="/" className="left brand-logo"><img src="logo.png"/>BoneBuds</a>
          <ul className="right">
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