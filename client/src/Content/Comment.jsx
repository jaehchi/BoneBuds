import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Comment extends Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: ''
    }
    this.likeComment = this.likeComment.bind(this);
    this.userNameClick = this.userNameClick.bind(this);
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
  likeComment(e) {
    let liked = ++this.props.comment.likes
    const payload = {
      ID: this.props.comment.commentID,
      likes: liked
    }
    axios.put('/comments/likeComment', payload)
      .then((res) => {
        console.log(res);
      })
  }
  userNameClick() {
    this.props.clickUserID(this.props.comment.userID);
  }
  render () {
    let liked = '';
    if (this.props.comment.likes === 1) {
      liked = `${this.props.comment.likes} person likes this`;
    } else {
      liked = `${this.props.comment.likes} people like this`
    }
    let pic = '';
    if (this.state.comment.profileUrl === 'undefined') {
      pic = '/logo.svg';
    } else {
      pic = this.state.comment.profileUrl;
    }
    return (
      console.log('hi');
      <div id="profile-page-wall-post" className="card">
        <div className="card-profile-title">
          <div className="row">
            <div className="col s1">
              <img src={pic} alt="" className="circle responsive-img valign profile-post-uer-image"/>
            </div>
            <div className="col s10">
              <Link to='friendPage'><p onClick={this.userNameClick} className="grey-text text-darken-4 margin">{this.state.comment.username || 'Anonymous'}</p></Link>
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
          <div className="col s8 card-action-share">
            <a onClick={this.likeComment} value={this.props.ID} href="#"><i className="material-icons left">thumb_up </i>{liked}</a>
          </div>
          <div className="col s4 card-action-share right-align">
            <span className="grey-text text-darken-1 ultra-small">{moment(this.props.comment.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;