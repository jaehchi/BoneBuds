import React, { Component } from 'react';
import Post from '../Post';
import axios from 'axios';


class EventProfile extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    console.log('props for events', this.props);
    return (
      <div id="eventProfile">
        {/* <h5>{this.props.event.title}</h5> */}
        <div className="scrollable">
          <div id="profile-page-wall-post" class="card">
            <div class="card-profile-title">
              <div class="row">
                <div class="col s1">
                  <img src="logo.png" alt="" class="circle responsive-img valign profile-post-uer-image"/>                        
                </div>
                <div class="col s10">
                  <p class="grey-text text-darken-4 margin">{this.props.event.owner}</p>
                  <span class="grey-text text-darken-1 ultra-small">26 Jun 2015</span>
                </div>
                <div class="col s1 right-align">
                  <i class="mdi-navigation-expand-more"></i>
                </div>
              </div>
            </div>
            <div class="card-image profile-medium">                          
              <img src={this.props.event.image} alt="sample" class="responsive-img profile-post-image profile-medium"/>                        
              <span class="card-title">{this.props.event.tag}</span>
            </div>
            <div class="card-content">
              <p>{this.props.event.description}</p>
            </div>
            <div class="card-action row">
              <div class="col s4 card-action-share">
                <a href="#"><i className="material-icons left">thumb_up</i></a>                          
                <a href="#">Share</a>
              </div>
              
              <div class="input-field col s8 margin">
                <input id="profile-comments" type="text" class="validate margin"/>
                <label for="profile-comments" class="">Comments</label>
              </div>                        
            </div>                        
          </div>

        
        { this.props.posts.map( post => {
          return ( <Post postID={post.postID} post={post}/> );
        })}
        </div>
      </div>
    )
  }
}

export default EventProfile;