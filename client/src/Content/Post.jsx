import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios'

class Post extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    
  }

  render () {
    return (
      <div className="scrollable"> 
        <div id="profile-page-wall-post" className="card">
          <div className="card-profile-title">
            <div className="row">
              <div className="col s1">
                <img src="logo2.png" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
              </div>
              <div className="col s10">
                <p className="grey-text text-darken-4 margin">John Doe</p>
                <span className="grey-text text-darken-1 ultra-small">25 Jun 2015</span>
              </div>
              <div className="col s1 right-align">
                <i className="mdi-navigation-expand-more"></i>
              </div>
            </div>
          </div>

          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>

          <div className="card-action row">
            <div className="col s2 card-action-share">
              <a href="#"><i className="material-icons left">thumb_up</i></a>                          
            </div>
            
            <div className="input-field col s10 margin right">
              <input id="profile-comments" type="text" className="validate margin" placeholder="Write a reply!"/>
              <label for="profile-comments" className="">Comments</label>
            </div>
          </div>  
          <div className="row col s9 right">
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