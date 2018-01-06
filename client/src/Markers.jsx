import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

export class Markers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'The marker`s title will appear as a tooltip.',
      name: 'HRLA eeeeeeeeee yeeeeee son!!!',
      position: {lat: 33.976796, lng: -118.392161},
    }
    this.setMarkerValues = this.setMarkerValues.bind(this)
  }

  setMarkerValues(title, name, position) {
    this.setState({
      title,
      name,
      position,
    })
  }

  render() {
    return (
      <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 33.99996, lng: -118.492161}}
      />
    )
  }
}

// <Marker
//   title={this.state.title}
//   name={this.state.name}
//   position={this.state.position}
//   onClick={this.props.markerClick}
// />


// Might Not Need This After All