import React, { Component } from 'react';

class Post extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div id="profile-page-wall-post" className="card">
        <div className="card-profile-title">
          <div className="row">
            <div className="col s1">
              <img src="logo2.png" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
            </div>
            <div className="col s10">
              <p className="grey-text text-darken-4 margin">John Doe</p>
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
          <div className="col s10 card-action-share right">
            <span className="grey-text text-darken-1 ultra-small">26 Jun 2015</span>                      
          </div>
        </div>
      </div>
    )
  }
}

export default Post;