import React, { Component } from 'react';
import Comment from './Comment';
import axios from 'axios'

class Post extends Component {
  constructor (props) {
    super(props);
  
    this.state = {
      comments: [],
      comment: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);  
  }

  componentDidMount () {

    const payload = {
      postID: this.props.postID
    }

    axios.post('/comments/fetchAllCommentsByPost', payload)
      .then( commentResponse => {
        this.setState({
          comments: commentResponse.data
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  onSubmit (e) {
    e.preventDefault()
    
    const payload = {
      postID: this.props.postID,
      text: this.state.comment,
      username: this.props.user
    }

    axios.post('/comments/createComment', payload)
      .then( response => {
        console.log(response);
        this.setState({
          comments: response.data
        })
      })
      .catch( err => {
        console.log(err);
      })
    
     e.target.reset();
  }

  onChangeHandler(e) {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(this.state)
  }

  render () {
    console.log(this.props, 'herror');
    return (
      <div> 
        <div id="profile-page-wall-post" className="card blue lighten-5 ">
          <div className="card-profile-title">
            <div className="row">
              <div className="col s1">
                <img src="logo2.png" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
              </div>
              <div className="col s10">
                <p className="grey-text text-darken-4 margin">{this.props.post.username}</p>
                <span className="grey-text text-darken-1 ultra-small">{this.props.post.createdAt}</span>
              </div>
              <div className="col s1 right-align">
                <i className="mdi-navigation-expand-more"></i>
              </div>
            </div>
          </div>

          <div className="card-content">
            <p>{this.props.post.text}</p>
          </div>

          <div className="card-action row">
            <div className="col s2 card-action-share">
              <a href="#"><i className="material-icons left">thumb_up</i></a>                          
            </div>
            
              <div className="input-field col s10 margin right">
                <form onSubmit={this.onSubmit} >
                  <input
                    id="profile-comments"
                    type="text"
                    name="comment"
                    className="validate margin" 
                    onChange={this.onChangeHandler}
                  />
                </form>
                <label htmlFor="profile-comments" className="">Comments</label>
                <h5 className="right">Comments</h5>
              </div>
            
            
            <div className="row col s10 small right">
              {this.state.comments.map( comment => {
                return  ( <Comment key={comment.id} comment={comment} /> )
              })}
            </div>                      
          </div>  

        </div>
      </div>  
    )
  }
}

export default Post;