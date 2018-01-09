import React, { Component } from 'react';
import Post from '../Post';
import axios from 'axios';


class EventProfile extends Component {
  constructor (props) {
    super(props);

  }

  render () {
    // console.log(this.props.currentUser.displayName, 'eventprofile')
    return (
      <div id="eventProfile">
        <div id="profile-page-wall-posts"class="row">
          <div class="col s12">
            <div className="scrollable">
              <div id="profile-page-wall-post" class="card">
                <div class="card-profile-title">
                  <div class="row">
                    <h3>{this.props.event.title}</h3>
                  </div>  
                  <div class="row">
                    <div class="col s1">
                      <img src="logo.png" alt="" class="circle responsive-img valign profile-post-uer-image"/>                        
                    </div>
                    <div class="col s10">
                      <p class="grey-text text-darken-4 margin">{this.props.event.owner}</p>
                      <span class="grey-text text-darken-1 ultra-small">{this.props.event.date}</span>
                      <br></br>
                      <span class="grey-text text-darken-1 ultra-small">{this.props.event.time}</span>
                    </div>
                    <div class="col s1 right-align">
                      <i class="mdi-navigation-expand-more"></i>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="card-image profile-medium col s6">                          
                    <img src={this.props.event.image} alt="sample" class="responsive-img profile-post-image profile-medium"/>                        
                    <span class="card-title">{this.props.event.tag}</span>
                  </div>
                  <div class="card-content col s6">
                    <p>{this.props.event.description}</p>
                  </div>
                </div>
                <div class="card-action row">
                  <div class="col s2 card-action-share">
                    <a href="#"><i className="material-icons left">thumb_up</i></a>                          
                  </div>
                  
                  <div class="input-field col s10 margin">
                    <input id="profile-comments" type="text" class="validate margin"/>
                    <label for="profile-comments" class="">Posts</label>

                  </div>
                    <h5 className="right">Replies</h5>
                    <div className="row small right">
                        { this.props.posts.map( post => {
                          return ( <Post key={post.postID} postID={post.postID} post={post} user={this.props.currentUser.displayName}/> );
                        })}
                    </div>    
                </div>                        
              </div>

            
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventProfile;