import React, { Component } from 'react';
import Comment from './Comment';

class Post extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div class="scrollable"> 
        <div id="profile-page-wall-post" class="card">
          <div class="card-profile-title">
            <div class="row">
              <div class="col s1">
                <img src="logo2.png" alt="" class="circle responsive-img valign profile-post-uer-image"/>                        
              </div>
              <div class="col s10">
                <p class="grey-text text-darken-4 margin">John Doe</p>
                <span class="grey-text text-darken-1 ultra-small">25 Jun 2015</span>
              </div>
              <div class="col s1 right-align">
                <i class="mdi-navigation-expand-more"></i>
              </div>
            </div>
          </div>

          <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>

          <div class="card-action row">
            <div class="col s2 card-action-share">
              <a href="#"><i className="material-icons left">thumb_up</i></a>                          
            </div>
            
            <div class="input-field col s10 margin right">
              <input id="profile-comments" type="text" class="validate margin" placeholder="Write a reply!"/>
              <label for="profile-comments" class="">Comments</label>
            </div>
          </div>  
          <div class="row col s9 right">
            <Comment/>
            <Comment/>
            <Comment/>

          </div>                      
        </div>
      </div>  
    )
  }
}

export default Post;