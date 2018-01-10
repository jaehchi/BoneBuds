import React, { Component } from "react";
import Post from "../Post";
import axios from "axios";

class EventProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: "",
      posts: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    const { socket } = this.props;
    
    socket.on('RetrievingPosts', posts => {
      this.setState({
        posts: posts
      })
    });

    const payload = {
      eventID: this.props.eventID
    }
    axios.post('/posts/fetchAllPostsByEvent', payload)
      .then( postResponse => {
        this.setState({
          posts: postResponse.data
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
      username: this.props.currentUser.displayName
    }

    this.props.submit(payload);

    e.target.reset()

  }

  render() {
    // console.log(this.props.currentUser.displayName, 'eventprofile')
    
    // console.log('props for event profile,', this.props)
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
                        src="logo.png"
                        alt=""
                        className="circle responsive-img valign profile-post-uer-image"
                      />
                    </div>
                    <div className="col s10">
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
                    <div className="col s1 right-align">
                      <i className="mdi-navigation-expand-more" />
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
                          socket={this.props.socket}
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
