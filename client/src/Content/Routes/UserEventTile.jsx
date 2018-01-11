import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserEventTile extends Component {
  constructor () {
    super();

  }


  render () {
    return (
      <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-image">
            <img src="https://i.imgur.com/2KoKbtz.gif"/>
            <span className="card-title">Card Title</span>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    </div>
              
  
    )
  }
}

export default UserEventTile;

