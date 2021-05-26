import React from 'react';
import styles from './UsernameCreate.module.css';

import UsernameCreateForm from './UsernameCreateForm/UsernameCreateForm';

const UsernameCreate = () => (
  <div className={styles.UsernameCreate}>
    <UsernameCreateForm />
  </div>
);

export default UsernameCreate;
