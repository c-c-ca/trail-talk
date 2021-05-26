import React from 'react';
import { IconFacebook } from '../../Icon/Icon';
import styles from './FacebookButton.module.css';

const FacebookButton = ({ text, to, disabled }) => (
  <a
    className={`${styles.FacebookButton} ${
      disabled ? styles.Disabled : undefined
    }`}
    href={to}
    onClick={e => {
      if (disabled) e.preventDefault();
    }}
  >
    <div className={styles.FacebookIconWrapper}>
      <IconFacebook />
    </div>

    <p className={styles.FacebookButtonText}>{text}</p>
  </a>
);

export default FacebookButton;
