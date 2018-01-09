import React, { Component } from "react";
import axios from "axios";
import ContentContainer from "./Content/ContentContainer";
import Nav from "./Authentication/Nav";
import Events from "./Events/Events";
import Login from "./Authentication/Login";
import LoginLanding from "./Authentication/LoginLanding";
import firebase, { auth } from "./Authentication/firebase";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      users: [],
      user: null,
      events: [],
      currentEventID: "",
      currentEvent: [],
      posts: []
    };
    this.handleUserToken = this.handleUserToken.bind(this);
    this.logout = this.logout.bind(this);
    this.setName = this.setName.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: users[user].uid,
          email: users[user].email,
          user: users[user].displayName,
          name: ""
        });
      }
      this.setState({
        users: newState
      });
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });

    axios
      .get("/events/fetchAllEvents")
      .then(eventsResponse => {
        this.setState({
          events: eventsResponse.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleUserToken() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
      alert("logout successful");
    });
  }
  setName(name) {
    this.setState({
      name
    });
  }

  onClick(id) {
    const payload = {
      eventID : id
    }
    axios.post('/events/fetchByEventID', payload)
      .then( (eventResponse) => {

        this.setState({
          currentEventID: id,
          currentEvent: eventResponse.data
        });

        const payloadForPost = {
          eventID: this.state.currentEventID
        }
    
        axios.post('/posts/fetchAllPostsByEvent', payloadForPost)
          .then( postResponse => {
            this.setState({
              posts: postResponse.data
            })
          })
          .catch( err => {
            console.log( err);
          })
        
      })
      .catch( err => {
        console.log(err);
      })
  

  }

  render() {
    console.log('post from this.state', this.state)
    return (
      <div>
        {!this.state.user ? (
          <LoginLanding
            handleUserToken={this.handleUserToken}
            handleLogin={this.handleLogin}
          />
        ) : (
          <div>
            <Nav logout={this.logout} />
            <h3>
              Welcome,{" "}
              {this.state.name ||
                this.state.user.displayName ||
                this.state.user.email}
            </h3>
            <div className="container">
              <div className="row">
                <div className="col s3">
                  <Events click={this.onClick} events={this.state.events} />
                </div>
                <div className="col s9">
                  <ContentContainer
                    currentUser={this.state.user}
                    setName={this.setName}
                    users={this.state.users}
                    eventID={this.state.currentEventID}
                    event={this.state.currentEvent}
                    posts={this.state.posts}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
