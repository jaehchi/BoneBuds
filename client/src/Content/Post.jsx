import React, { Component } from 'react';
import Comment from './Comment';

class Post extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div id="profile-page-wall-post" class="card">
        <div class="card-profile-title">
          <div class="row">
            <div class="col s1">
              <img src="logo.jpg" alt="" class="circle responsive-img valign profile-post-uer-image"/>                        
            </div>
            <div class="col s10">
              <p class="grey-text text-darken-4 margin">John Doe</p>
              <span class="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
            </div>
            <div class="col s1 right-align">
              <i class="mdi-navigation-expand-more"></i>
            </div>
          </div>
          <div class="row">
            <div class="col s10 right">
              <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
            </div>
          </div>
          <div>
          <div id="profile-page-wall-post" class="card">
        <div class="card-profile-title">
          <div class="row">
            <div class="col s1">
              <img src="logo.jpg" alt="" class="circle responsive-img valign profile-post-uer-image"/>                        
            </div>
            <div class="col s10">
              <p class="grey-text text-darken-4 margin">John Doe</p>
              <span class="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
            </div>
            <div class="col s1 right-align">
              <i class="mdi-navigation-expand-more"></i>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
            </div>
          </div>

          <div class="row">
            <input placeholder="fuck you"/>
          </div>
      </div>
      </div>
            <Comment/>
          </div>
          <div class="row">
            <input placeholder="fuck you"/>
          </div>
      </div>
      </div>
        
        

    )
  }
}

export default Post;