import React from 'react';
import styles from './Button.module.css';

const style = {
  backgroundColor: function (level) {
    const colors = {
      primary: '#0a99ff',
      default: 'hsl(220, 90%, 50%)',
      warm: 'hsl(28, 100%, 55%)',
      fun: 'hsl(150, 95%, 60%)',
      success: '#56ab2f',
    };
    return colors[level];
  },
};

const Button = ({ text, level, to }) => (
  <a
    className={`${styles.Button} ${styles.ButtonSuccess}`}
    style={style.backgroundColor(level)}
    to={to}
  >
    {text}
  </a>
);

export default Button;
