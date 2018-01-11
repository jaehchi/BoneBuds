import React, { Component } from "react";
import axios from "axios";
import ContentContainer from "./Content/ContentContainer";
import Nav from "./Authentication/Nav";
import Events from "./Events/Events";
import Login from "./Authentication/Login";
import LoginLanding from "./Authentication/LoginLanding";
import firebase, { auth } from "./Authentication/firebase";
import io from 'socket.io-client';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      users: [],
      user: '',
      events: [],
      currentEventID: "",
      currentEvent: [],
      posts: [],
      usersEvents: []
    };
    this.handleUserToken = this.handleUserToken.bind(this);
    this.logout = this.logout.bind(this);
    this.setName = this.setName.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  //To initialize socketio, we will place it in componentDidMount
  // and not in constructor because it is an network event
  // WHY? because constructor is gonna happen initially,
  // and CDM is something that happens asynchronously

  componentDidMount() {
    //this will trigger the on connection event in server/index.js
    // now socket.io is connecting server/client
    // this.socket = io('/') <-- unable to pass this shit down to childen;
    const socket = io('/');
    // solution for that is ^^

    // sends someData to the server thru join listener event
    socket.emit('join', 'someDATA')
    //set a 'yo' event listener and console.logs data sent from server
    socket.on('yo', (data) => {
      console.log(data);
    })

    //check createPost.js for fetchPostbyEventID
    //listens on posts event and setstate the data!
    //look at onPostSubmit
    socket.on('posts', posts => {
      this.setState({
        posts: posts
      });
    });

    socket.on('fetchAllEvents', events => {
      this.setState({
        events: events
      });
    });

    socket.on('eventsByUser', eventsByUser => {
      console.log('Users events in Socket', eventsByUser);
    })


    const usersRef = firebase.database().ref("users");
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: users[user].uid,
          email: users[user].email,
          user: users[user].displayName,
          first: "",
          last: "",
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
  
  setName(first, last) {
    this.setState({
      first,
      last,
    });
  }

  onClick(id) {
    const payload = {
      eventID: id
    }

    axios.post('/events/fetchByEventID', payload)
      .then((eventResponse) => {

        this.setState({
          currentEventID: id,
          currentEvent: eventResponse.data
        });
      })
      .then(() => {
        const payloadForPost = {
          eventID: this.state.currentEventID
        }

        axios.post('/posts/fetchAllPostsByEvent', payloadForPost)
          .then(postResponse => {
            this.setState({
              posts: postResponse.data
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(error => {
        console.log(error);
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSubmitPost(payload) {

    axios.post('posts/createPost', payload)
      .then(response => {
        // NO NEED FOR THIS SETSTATE HERE
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }


  render() {
    // console.log('this.state for app: ', this.state);
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
                {this.state.user.displayName ||
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
                      submit={this.onSubmitPost}
                      change={this.onChangePost}
                      socket={socket}
                      user={this.state.user}
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


//emit data to trigger someting listener event on the server
//this.socket.emit('something', somethingdata)