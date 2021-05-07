import React from 'react';
import { IconGitHub } from '../../Icon/Icon';
import styles from './GitHubButton.module.css';

const GitHubButton = ({ text }) => (
  <a className={styles.GitHubButton} href="/auth/github">
    <div className={styles.GitHubIconWrapper}>
      <IconGitHub />
    </div>

    <p className={styles.GitHubButtonText}>{text}</p>
  </a>
);

export default GitHubButton;
