import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const Markers = (props) => (
  props.earthquakeData.map((info, i) => {
    console.log(info.geometry.coordinates)
    return <Marker
      key={i}
      title={'The marker`s title will appear as a tooltip.'}
      name={info.geometry.type}
      position={{
        lat: info.geometry.coordinates[1],
        lng: info.geometry.coordinates[0],
      }}
      onClick={props.onMarkerClick}
    />
  })
)

export default Markers;