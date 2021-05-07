import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Row from '../Layout/Grid/Row';
import styles from './Header.module.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li>
            <Link to="/login">Sign In</Link>
          </li>,
          <li>
            <Link to="/register">Register</Link>
          </li>,
        ];
      default:
        return [
          <li key="1">
            <Link to="/trails">Discuss</Link>
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav className={styles.Header}>
        <Row>
          <div className={styles.HeaderContainer}>
            <Link to="/">Trail Talk</Link>
            <ul className={styles.Buttons}>{this.renderContent()}</ul>
          </div>
        </Row>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
