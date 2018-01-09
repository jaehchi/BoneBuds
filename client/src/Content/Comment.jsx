import React, { Component } from 'react';

class Comment extends Component {
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
              <p className="grey-text text-darken-4 margin">{this.props.comment.username}</p>
            </div>
            <div className="col s1 right-align">
              <i className="mdi-navigation-expand-more"></i>
            </div>
          </div>
        </div>

        <div className="card-content">
          <p>{this.props.comment.text}</p>
        </div>

        <div className="card-action row">
          <div className="col s2 card-action-share">
            <a href="#"><i className="material-icons left">thumb_up</i></a>    
          </div>
          <div className="col s10 card-action-share right">
            <span className="grey-text text-darken-1 ultra-small">{this.props.comment.createdAt}</span>                      
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;