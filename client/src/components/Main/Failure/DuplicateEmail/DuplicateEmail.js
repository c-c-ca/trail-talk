import React from 'react';
import Failure from '../Failure';
import Button from '../../Button/Button';
import styles from '../Failure.module.css';

const DuplicateEmail = () => (
  <Failure title="Registration Failed">
    <p>
      <span className={styles.Bold}>Uh, oh!</span> It looks like this email
      address is already being used.
    </p>
    <p>Please use another email.</p>
    <div className={styles.ButtonWrapper}>
      <Button text="Return to Registration" level="primary" to="/register" />
    </div>
  </Failure>
);

export default DuplicateEmail;
