import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MapContainer from "./Routes/MapContainer";
import UserProfile from "./Routes/UserProfile";
import EventProfile from "./Routes/EventProfile";
import CreateEvent from "./Routes/CreateEvent";
import EditEvent from "./Routes/EditEvent";
import UserPage from './Routes/UserPage';
import UserEvents from './Routes/UserEvents'

class ContentContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasSetUserInfo: '',
    }
    this.hasSetUserInfo = this.hasSetUserInfo.bind(this);
  }

  hasSetUserInfo() {
    this.setState({
      hasSetUserInfo: true,
    })
  }

  render() {
    // console.log('props for content container', this.props);
    return (
      <main>
        <Switch>
          <Route
            exact path="/"
            component={MapContainer}
            hasSetUserInfo={this.state.hasSetUserInfo}
          />
          <Route
            path="/userpage"
            render={() => (
              <UserPage
                currentUser={this.props.currentUser}
                setName={this.props.setName}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path="/userprofile"
            render={() => (
              <UserProfile
                currentUser={this.props.currentUser}
                setName={this.props.setName}
                isLoggedIn={this.isLoggedIn}
              />
            )}
          />
          <Route
            path="/eventprofile"
            render={() => (
              <EventProfile
                eventID={this.props.eventID}
                event={this.props.event}
                posts={this.props.posts}
                currentUser={this.props.currentUser}
                change={this.props.change}
                submit={this.props.submit}
                socket={this.props.socket}
              />
            )}
          />
          <Route
            path="/editEvent"
            render={() => <EditEvent eventID={this.props.eventID} />}
          />
          <Route
            path="/createEvent"
            render={() => <CreateEvent owner={this.props.user}/>} />

          <Route
            path="/userEvents"
            render={() => <UserEvents user={this.props.currentUser}/>} />

        </Switch>
      </main>
    )
  }
}

export default ContentContainer;
