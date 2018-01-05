import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: [],
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log('marker clicked');
    this.setState({
      showingInfoWindow: true,
      selectedPlace: props,
      activeMarker: marker,
    });
  }

  render() {
    const style = {
      width:'100%',
      height: '500px',
    }
    return (
      <Map
        google={this.props.google} zoom={17}
        style={style}
        initialCenter={{
          lat: 33.976796,
          lng: -118.392161
        }}>
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'HRLA eeeeeeeeee yeeeeee son!!!'}
          position={{lat: 33.976796, lng: -118.392161}}
          onClick={this.onMarkerClick}
          />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDh9Qs7nl5RKXwaDmCeo8bt0YG4cb0xnh8')
})(MapContainer)