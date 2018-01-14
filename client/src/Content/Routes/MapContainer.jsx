import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import io from 'socket.io-client';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      events: [],
      hasSetUserInfo: '',
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  componentDidMount() {
    axios.get('users/popups')
      .then(() => {
      })
      .catch((e) => {
        console.log('Was not able to fetch longitude / latitude data', e);
      });

    const socket = io('/');
    socket.on('fetchAllEvents', events => {
      this.setState({
        events,
      })
    })
  }


  onMarkerClick(props, marker, e) {
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
        activeMarker: null,
      })
    }
  }

  render() {
    const style = {
      width:'75%',
      height: '90vh',
    }

    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        initialCenter={{
          lat: 33.976796,
          lng: -118.392161
        }}
        onClick={this.onMapClicked}>

        {
          this.state.events.map((event, i) => {
            return <Marker
              key={i}
              title={'Why don\'t ya click and find out?'}
              name={event.title}
              position={{
                lat: event.latitude,
                lng: event.longitude,
              }}
              onClick={this.onMarkerClick}
            />
          })
        }

        <Marker
          title={'Why don\'t ya click and find out?'}
          name={'Hack Reactor LA!!'}
          position={{lat: 33.976796, lng: -118.392161}}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div id="popupInfo">
              <h5 className="header center teal-text text-lighten-2">{this.state.selectedPlace.name}</h5>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDh9Qs7nl5RKXwaDmCeo8bt0YG4cb0xnh8')
})(MapContainer)