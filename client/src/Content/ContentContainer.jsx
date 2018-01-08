import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MapContainer from './Routes/MapContainer';
import UserProfile from './Routes/UserProfile';
import EventProfile from './Routes/EventProfile';

const ContentContainer = (props) => (
  <main>
    <Switch>
      <Route exact path='/' component={MapContainer} />
      <Route path='/userprofile' render={ () => (<UserProfile currentUser={props.currentUser}/>) } />
      <Route path='/eventprofile' render={ () => (<EventProfile/>)} />
    </Switch>
  </main>
)

export default ContentContainer;