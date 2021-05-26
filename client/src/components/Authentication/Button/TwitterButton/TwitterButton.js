import React from 'react';
import { IconTwitter } from '../../Icon/Icon';
import styles from './TwitterButton.module.css';

const TwitterButton = ({ text, to, disabled }) => (
  <a
    className={`${styles.TwitterButton} ${
      disabled ? styles.Disabled : undefined
    }`}
    href={to}
    onClick={e => {
      if (disabled) e.preventDefault();
    }}
  >
    <div className={styles.TwitterIconWrapper}>
      <IconTwitter />
    </div>

    <p className={styles.TwitterButtonText}>{text}</p>
  </a>
);

export default TwitterButton;
