import React from 'react';
import { IconGitHub } from '../../Icon/Icon';
import styles from './GitHubButton.module.css';

const GitHubButton = ({ text, to, disabled }) => (
  <a
    className={`${styles.GitHubButton} ${
      disabled ? styles.Disabled : undefined
    }`}
    href={to}
    onClick={e => {
      if (disabled) e.preventDefault();
    }}
  >
    <div className={styles.GitHubIconWrapper}>
      <IconGitHub />
    </div>

    <p className={styles.GitHubButtonText}>{text}</p>
  </a>
);

export default GitHubButton;
