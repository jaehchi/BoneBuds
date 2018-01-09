import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      eventInfo: 'Pug photo booth poutine, whatever hexagon sustainable iPhone hell of. Meh portland gluten-free kogi sustainable intelligentsia ethical. Narwhal coloring book pinterest raw denim.',
      events: [],
      hasSetUserInfo: this.props.isLoggedIn,
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.routeToUserProfile = this.routeToUserProfile.bind(this);
  }

  componentWillMount() {
    axios.get('users/popups')
      .then((response) => {
        console.log('Pre-fetching coordinates data... \nserver response:', response)
        response.data.forEach(event => {
          this.state.events.push(event)
        })
      })
      .catch((e) => {
        console.log('Was Not Able to GET latLong info from db', e);
      });
  }

  componentDidMount() {
    if (this.state.hasSetUserInfo === false) {
      Materialize.toast('Looks like your profile is missing some information!', 20000);
    }
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
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width:'75%',
      height: '80vh',
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
          name={'Hack Reactor LA ya bish!'}
          position={{lat: 33.976796, lng: -118.392161}}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div id="popupInfo">
              <h5>{this.state.selectedPlace.name}</h5>
              {this.state.eventInfo}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDh9Qs7nl5RKXwaDmCeo8bt0YG4cb0xnh8')
})(MapContainer)