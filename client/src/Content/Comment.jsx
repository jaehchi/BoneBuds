import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Comment extends Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: ''
    }
  }

  componentDidMount () {
    axios.post('/comments/findUserFromComment', { userID: this.props.comment.userID})
    .then( commentResponse => {
      this.setState({
        comment: commentResponse.data
      })
    })
    .catch( e => {
      console.log(e);
    })
  }

  render () {
    let pic = '';
    if (this.state.comment.profileUrl === 'undefined') {
      pic = '/logo.svg';
    } else {
      pic = this.state.comment.profileUrl;
    }
    return (
      <div id="profile-page-wall-post" className="card">
        <div className="card-profile-title">
          <div className="row">
            <div className="col s1">
              <img src={pic} alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
            </div>
            <div className="col s10">
              <p className="grey-text text-darken-4 margin">{this.state.comment.username || 'Anonymous'}</p>
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
            <span className="grey-text text-darken-1 ultra-small">{moment(this.props.comment.createdAt).fromNow()}</span>                      
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;