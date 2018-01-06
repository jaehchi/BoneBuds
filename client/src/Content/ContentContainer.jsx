import React, { Compononent } from 'react';
import { Switch, Route } from 'react-router-dom';
import MapContainer from './routes/MapContainer';

const ContentContainer = () => {
  <ContentContainer>
    <Switch>
      <Route exact path='/' component={MapContainer}/>
    </Switch>
  </ContentContainer>
}