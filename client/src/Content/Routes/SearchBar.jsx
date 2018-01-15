import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import Fuse from "fuse.js";
import SearchList from "./SearchList.jsx";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuse: "",
      searched: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("/users/allUsers")
      .then(users => {
        console.log(users.data)
        const options = {
          shouldSort: true,
          includeScore: false,
          threshold: 0.45,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            {
              name: "username",
              weight: 0.3
            },
            {
              name: "title",
              weight: 0.4
            },
            {
              name: "description",
              weight: 0.1
            },
            {
              name: "location",
              weight: 0.1
            },
            {
              name: "tag",
              weight: 0.3
            }
          ]
        };
        let fuze = new Fuse(users.data, options);
        this.setState({
          fuse: fuze,
          searched: fuze.list
        });
        // const fuse = new Fuse(users, options)
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(e) {

    if ( e.target.value) {
      this.setState({
        searched: this.state.fuse.search(e.target.value)
      });
    } else {
      this.setState({
        searched: this.state.fuse.list
      })
    }
  }

  render() {
 
    return (
      <div className="wrapper scrollable">
        <div className="card card-panel align-center row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s6 s12 blue-text">
                <i className="blue-text material-icons prefix">search</i>
                <input
                  type="text"
                  placeholder="search"
                  id="autocomplete-input"
                  className="autocomplete blue-text"
                  onKeyUp={this.handleSubmit}
                />
                <ul className="collection">
                  { 
                  this.state.searched ? 
                    this.state.searched.map(item => {
                      return <SearchList item={item}  click={this.props.click}/>
                    })
                    : 
                    null
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
