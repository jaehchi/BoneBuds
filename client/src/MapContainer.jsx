import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Markers from './Markers';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      earthquakeData: [],
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);

  }

  componentDidMount() {
    fetch('https://api.geonet.org.nz/intensity?type=measured')
      .then(results => results.json())
      .then(data => {
        this.setState({
          earthquakeData: data.features,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  onMarkerClick(props, marker, e) {
    console.log('marker clicked');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    const style = {
      width:'1000px',
      height: '500px',
    }

    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={style}
        initialCenter={{
          lat: 33.976796,
          lng: -118.392161
        }}>

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'Water'}
          position={{lat: 33.99996, lng: -118.492161}}
          onClick={this.onMarkerClick}
        />

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'Hack Reactor LA is for bishes'}
          position={{lat: 33.976796, lng: -118.392161}}
          onClick={this.onMarkerClick}
        />

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'Home Depot'}
          position={{lat: 33.988796, lng: -118.362161}}
          onClick={this.onMarkerClick}
        />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDh9Qs7nl5RKXwaDmCeo8bt0YG4cb0xnh8')
})(MapContainer)