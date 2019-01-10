import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Users from './Components/users';
import User from './Components/user';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      users: [],
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

  render() {
    return (
      <div className="App">
        <Route exact path='/users' render={props => (
          <Users {...props} 
          users={this.state.users}/>
        )}
        />
        <Route path='/users/:id' render={props => (
          <User {...props} />
        )}
        />
      </div>
    );
  }
}

export default App;
