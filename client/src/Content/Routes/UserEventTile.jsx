import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserEventTile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      eventInfo: '',
    }
  }


  render () {
    return (
      <div className="wrapper">
      <div className="col s4">
        <div className="card">
          <div className="card-image">
            <img src="https://rs1107.pbsrc.com/albums/h398/DMNYK1000/LevyTran.gif~c200"/>
            <span className="card-title black-text"><strong>{this.props.event.title}</strong></span>
            <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
          </div>
          <div className="card-content">
            <p><strong>{this.props.event.description}</strong><br/> I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    </div>


    )
  }
}

export default UserEventTile;

