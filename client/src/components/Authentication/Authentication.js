import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';

class Authentication extends Component {
  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default Authentication;
