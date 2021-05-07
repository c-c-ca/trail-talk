import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const style = {
  backgroundColor: function (level) {
    const colors = {
      primary: '#0a99ff',
      default: 'hsl(220, 90%, 50%)',
      warm: 'hsl(28, 100%, 55%)',
      fun: 'hsl(150, 95%, 60%)',
    };
    return {
      backgroundColor: colors[level],
      color: level == 'fun' ? '#000' : '#fff',
    };
  },
};

const Button = ({ text, level, to }) => (
  <Link className={styles.Button} style={style.backgroundColor(level)} to={to}>
    {text}
  </Link>
);

export default Button;
