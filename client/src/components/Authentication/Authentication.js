import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import UsernameCreate from './UsernameCreate/UsernameCreate';
import VerificationFailure from './VerificationFailure/VerificationFailure';
import Connect from './Connect/Connect';
import Verify from './Verify/Verify';
import Account from './Account/Account';
import PasswordReset from './PasswordReset/PasswordReset';

class Authentication extends Component {
  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/connect" component={Connect} />
        <Route path="/verify" component={Verify} />
        <Route path="/account" component={Account} />
        <Route path="/username" component={UsernameCreate} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/verification-failure" component={VerificationFailure} />
      </div>
    );
  }
}

export default Authentication;
