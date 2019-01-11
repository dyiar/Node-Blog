import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Users from './Components/users';
import User from './Components/user';
import Posts from './Components/posts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      users: [],
      user: [],
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
    .then(response => {
      this.setState({
        users: response.data.users
      });
    })
    .catch(() => console.log("error!"))
  }

  getUser = id => {
    axios.get(`http://localhost:5000/users/${id}`)
    .then(response => {
      this.setState(() => ({ user: response.data.user }))
    })
    .catch(() => console.log('error!'))
  }

  getPosts = id => {
    axios.get(`http://localhost:5000/users/posts/${id}`)
    .then(response => {
      this.setState(() => ({ posts: response.data.posts }))
    })
    .catch(() => console.log('error getting posts'))

  }

  render() {
    return (
      <div className="App">
        <Route exact path='/users' render={props => (
          <Users {...props} 
          users={this.state.users}
          getUser={this.getUser}/>
        )}
        />
        <Route path='/users/:id' render={props => (
          <User {...props}
          user={this.state.user}
          getPosts={this.getPosts} />
        )}
        />
        <Route path='/users/posts/:id' render={props => (
          <Posts {...props}
          posts={this.state.posts} />
        )}
        />
      </div>
    );
  }
}

export default App;
