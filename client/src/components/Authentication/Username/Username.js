import React from 'react';
import styles from './Username.module.css';

import UsernameForm from './UsernameForm/UsernameForm';

const Username = () => (
  <div className={styles.Username}>
    <UsernameForm />
  </div>
);

export default Username;
