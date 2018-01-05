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
      <div>
        <div className="container">
        Hello from React!
        <Nav/>
        <Login/>
        <div className="container">
          <MapContainer />
        </div>
        <div className="container">
          <Events/>
        </div>
        </div>
      </div>
    )
  }
}

export default App;