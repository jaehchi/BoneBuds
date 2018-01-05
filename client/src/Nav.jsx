import React, { Component } from 'react';


class Nav extends Component {
  constructor () {
    super();
    
  }

  render () {
    return (
      <div>
        <div className="row">
          <nav>
            <div className="nav-wrapper blue darken-1">
              <a href="#!" className="left brand-logo"><img src="logo.png"/>BoneBuds</a>
              <ul className="right">
                <li><a href="#!"><i className="material-icons">search</i>Search</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i></a></li>
                <li><a href="#!"><i className="material-icons">refresh</i></a></li>
                <li><a href="#!"><i className="material-icons">more_vert</i></a></li>
              </ul>
            </div>
          </nav>
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;