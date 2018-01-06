import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer'
import Nav from './Nav';
import Events from './Events';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container">
        Hello from React!
        <Nav/>
        <Login/>
        <div className="container">
          <div className="row">
            <div className="col s12 m4 l3">
              <Events/>
            </div>
            <div className="col s12 m8 l9">
            <MapContainer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;