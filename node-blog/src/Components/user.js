import React, { Component } from 'react';
import axios from 'axios';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    }

    // componentDidUpdate() {
    //     const id = this.props.match.params.id;
    //     this.getUser(id);
    // }

    getUser = id => {
        axios
        .get(`http://localhost:5000/users/${id}`)
        .then(response => {
            this.setState(() => ({ user: response.data.user }))
            console.log(response.data.user)
        })
        .catch(() => console.log('error!'))
    }
    render() {
        // if (!this.state.user) {
        //     return <div> loading user info... </div> 
        // }
    return (
        <div>
            {this.state.name}
        </div>
    )
    }
}

