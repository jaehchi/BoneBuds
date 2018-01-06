import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Content/MapContainer'
import Nav from './Authentication/Nav';
import Events from './Events/Events';
import Login from './Authentication/Login';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="navigation">
          <Nav />
        </div>

        <div className="login">
          <Login />
        </div>

        <div className="col s3">
          <Events />
        </div>

        <div className="ContentContainer">
          <MapContainer />
        </div>

      </div>
    )
  }
}

export default App;