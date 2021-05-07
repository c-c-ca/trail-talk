import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';

const Main = () => (
  <div>
    <Header />
    <Route path="/" component={Home} />
  </div>
);

export default Main;
