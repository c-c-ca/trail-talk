import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUpSection.module.css';

const SignUpSection = () => (
  <div className={styles.SignUpSection}>
    New to TrailTalk?
    <Link className={styles.SignUpSectionLink} to="/register">
      Sign Up
    </Link>
  </div>
);

export default SignUpSection;
