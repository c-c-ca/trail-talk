import React from 'react';
import { IconFacebook } from '../../Icon/Icon';
import styles from './FacebookButton.module.css';

const FacebookButton = ({ text }) => (
  <a className={styles.FacebookButton} href="/auth/facebook">
    <div className={styles.FacebookIconWrapper}>
      <IconFacebook />
    </div>

    <p className={styles.FacebookButtonText}>{text}</p>
  </a>
);

export default FacebookButton;
