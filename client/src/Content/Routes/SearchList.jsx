import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      eventInfo: '',
    }

    this.searchClick = this.searchClick.bind(this);
  
  }
  componentDidMount() {
    
  }

  searchClick () {
    this.props.click(this.props.item.eventID);
  }


  render () {
    return (
        <li className="collection-item avatar">
        

          {this.props.item.eventID ? 

          (<div>
            <img src={this.props.item.image || '/logo.svg'} alt="" className="circle responsive-img valign profile-post-uer-image"/>
            <span className="title">{this.props.item.title}</span>
            <p>{this.props.item.description}</p>
            <Link to="/eventprofile" onClick={this.searchClick}><i className="material-icons">grade</i>View</Link>
          </div>)

          :
          (<div>
            <img src={this.props.item.profileUrl || '/logo.svg'} alt="" className="circle responsive-img valign profile-post-uer-image"/>
            <span className="title">{this.props.item.username}</span>
            {/* <p>First Line <br></br>
              Second Line
            </p> */}
            <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </div>
          )
        }
        </li>

    )
  }

}

export default SearchList;

