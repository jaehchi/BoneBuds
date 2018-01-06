import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MapContainer from './Routes/MapContainer';
import UserProfile from './Routes/UserProfile';

const ContentContainer = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MapContainer} />
      <Route path='/userprofile' component={UserProfile} />
    </Switch>
  </main>
)

export default ContentContainer;