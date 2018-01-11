import React, { Component } from "react";
import Post from "../Post";
import axios from "axios";
import { Link } from 'react-router-dom';


class EventProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    console.log('fetch all data from this post');
  }

  componentDidMount () {
    const payload =  {
      userID: this.props.userData.userID
    };
    axios.post('/users/getUserData', payload)
      .then( response => {
        console.log(response.data)
        this.setState({
          owner: response.data
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit (e) {
    e.preventDefault()

    const payload = {
      eventID: this.props.eventID,
      text: this.state.post,
      userID: this.props.userData.userID,
      username: this.props.userData.username
    }

 
    this.props.submit(payload);
    e.target.reset()
  }

  render() {
    // console.log(this.props.currentUser.displayName, 'eventprofile')
    
    // console.log('state for event profile,', this.state)
    // console.log('props for event profile', this.props)
    return (
      <div id="eventProfile">
        <div id="profile-page-wall-posts" className="row">
          <div className="col s12">
            <div className="scrollable">
              <div id="profile-page-wall-post" className="card">
                <div className="card-profile-title">
                  <div className="row">
                    <h3>{this.props.event.title}</h3>
                  </div>
                  <div className="row">
                    <div className="col s1">
                      <img
                        src={this.props.event.ownerUrl}
                        alt=""
                        className="circle responsive-img valign profile-post-uer-image"
                      />
                    </div>
                    <div className="col s8">
                      <p className="grey-text text-darken-4 margin">
                        {this.props.event.owner}
                      </p>
                      <span className="grey-text text-darken-1 ultra-small">
                        {this.props.event.date}
                      </span>
                      <br />
                      <span className="grey-text text-darken-1 ultra-small">
                        {this.props.event.time}
                      </span>
                    </div>
                    <div className="col s3 right-align">
                      {/* <i className="mdi-navigation-expand-more" /> */}
                      <Link to="/editEvent" className="waves-effect waves-light btn"><i className="material-icons right">mode_edit</i>Edit Event</Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card-image profile-medium col s6">
                    <img
                      src={this.props.event.image}
                      alt="sample"
                      className="responsive-img profile-post-image profile-medium"
                    />
                    <span className="card-title">{this.props.event.tag}</span>
                  </div>
                  <div className="card-content col s6">
                    <p>{this.props.event.description}</p>
                  </div>
                </div>
                <div className="card-action row">
                  <div className="col s2 card-action-share">
                    <a href="#">
                      <i className="material-icons left">thumb_up</i>
                    </a>
                  </div>

                  <div className="input-field col s10 margin">
                    <form onSubmit={this.onSubmit} >
                      <input
                        id="profile-comments"
                        type="text"
                        name="post"
                        className="validate margin"
                        onChange={this.onChange}
                      />
                    </form>
                    <label htmlFor="profile-comments" className="">
                      Posts
                    </label>
                  </div>
                  <h5 className="right">Replies</h5>
                  <div className="row small right">
                    {
                      this.props.posts.map(post => {
                      return (
                        <Post
                          key={post.postID}
                          postID={post.postID}
                          post={post}
                          user={this.props.currentUser.displayName}
                          username={this.props.username}
                          //dont need user ^ when  username is working on userData
                          socket={this.props.socket}
                          userData={this.props.userData}
                        />
                      );
                    })
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventProfile;
