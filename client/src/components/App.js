import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../history';

import Main from './Main/Main';
import Authentication from './Authentication/Authentication';
import Profile from './Profile/Profile';
import MissingAccount from './Main/Failure/MissingAccount/MissingAccount';
import DuplicateEmail from './Main/Failure/DuplicateEmail/DuplicateEmail';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/" component={Authentication} />
            <Route path="/profile" component={Profile} />
            <Route path="/verification-failure" component={MissingAccount} />
            <Route path="/duplicate-email" component={DuplicateEmail} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
