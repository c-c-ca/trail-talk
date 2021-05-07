import React from 'react';
import styles from './Login.module.css';

import LoginForm from './LoginForm/LoginForm';

const Login = () => (
  <div className={styles.Login}>
    <LoginForm />
  </div>
);

export default Login;
