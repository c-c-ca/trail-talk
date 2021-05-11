import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Username from './Username/Username';
import VerificationFailure from './VerificationFailure/VerificationFailure';

class Authentication extends Component {
  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/create-username" component={Username} />
        <Route path="/verification-failure" component={VerificationFailure} />
      </div>
    );
  }
}

export default Authentication;
