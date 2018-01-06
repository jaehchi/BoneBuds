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
    this.onMapClicked = this.onMapClicked.bind(this);
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

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width:'1000px',
      height: '500px',
    }

    return (
      <Map
        google={this.props.google}
        zoom={1}
        style={style}
        initialCenter={{
          lat: 33.976796,
          lng: -118.392161
        }}
        onClick={this.onMapClicked}
        >

        {
          this.state.earthquakeData.map((info, i) => {
            console.log(info.geometry.coordinates[0], info.geometry.coordinates[1], info.geometry.type)
            return <Marker
              key={i}
              name={info.geometry.type}
              position={{lat: info.geometry.coordinates[0], lng: info.geometry.coordinates[1]}}
              onClick={this.onMarkerClick}
            />
          })
        }

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

        <Marker
          name={'Your position'}
          position={{lat: 37.762391, lng: -122.439192}}
          icon={{
            url: "/path/to/custom_icon.png",
            anchor: new google.maps.Point(32,32),
            scaledSize: new google.maps.Size(64,64)
          }}
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