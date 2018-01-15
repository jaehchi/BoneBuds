import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import path from 'path';

class FriendPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            address: '',
            dogname: '',
            dogbio: '',
            username: '',
            profileUrl: '',
        }

    }
    componentWillMount() {
        // console.log(this.props.currentUser)
        axios.get('/users/update/' + this.props.userID)
            .then((res) => {
                let pic = '';
                if (res.data.profileUrl === 'undefined') {
                    pic = '/logo.svg';
                } else {
                    pic = res.data.profileUrl;
                }
                this.setState({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    address: res.data.address,
                    dogname: res.data.dogname,
                    dogbio: res.data.dogbio,
                    username: res.data.username,
                    profileUrl: pic,
                })
            })
    }
    render() {
        return (
            <div className="card card-panel hoverable sticky-action" id="userPage">
                <div >
                    <img className="card card-panel hoverable sticky-action" id="profPic" src={this.state.profileUrl || "/logo.svg"} />
                    <div>Username: {this.state.username}</div>
                    <div>Dog: {this.state.dogname}</div>
                    <div>Dog Bio: {this.state.dogbio}</div>
                </div>
            </div>
        )
    }
}

export default FriendPage;