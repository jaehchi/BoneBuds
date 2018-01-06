import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div id="nav">
        <div className="row">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="#!" className="left brand-logo"><img src="logo.png"/>BoneBuds</a>
              <ul className="right">
                <li><a href="#!"><i className="material-icons">search</i>Search</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i></a></li>
                <li><Link to="/"><i className="material-icons">refresh</i></Link></li>
                <li><Link to="/userprofile"><i className="material-icons">more_vert</i></Link></li>
                <li><a href="#!" onClick={this.props.logout}>Logout</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Nav;