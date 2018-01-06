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
    const style = {
      padding: 0,
      margin: 0,
    }
    return (
      <div>
        <Nav />
        <Login />

        <div className="container" style={style}>
          <div className="row">
            <div className="col s3" >
              <Events/>
            </div>
            <div className="col s9">
              <MapContainer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;