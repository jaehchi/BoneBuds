import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      eventInfo: 'Pug photo booth poutine, whatever hexagon sustainable iPhone hell of. Meh portland gluten-free kogi sustainable intelligentsia ethical. Narwhal coloring book pinterest raw denim.',
      latLong: [],
      earthquakeData: [],
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  componentWillMount() {
    axios.get('users/popups')
      .then((response) => {
        console.log(response, 'Component Will Mount; Getting LatLong Info')
      })
      .catch((e) => {
        console.log(e, 'Was Not Able to GET latLong info from db');
      })
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
      width:'75%',
      height: '80vh',
    }

    return (
      <Map
        google={this.props.google}
        zoom={3}
        style={style}
        initialCenter={{
          lat: 33.976796,
          lng: -118.392161
        }}
        onClick={this.onMapClicked}>

        {
          this.state.earthquakeData.map((info, i) => {
            return <Marker
              key={i}
              title={'The marker`s title will appear as a tooltip.'}
              name={info.geometry.type}
              position={{
                lat: info.geometry.coordinates[1],
                lng: info.geometry.coordinates[0],
              }}
              onClick={this.onMarkerClick}
            />
          })
        }

        <Marker
          title={'Why won\'t ya click and find out?'}
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