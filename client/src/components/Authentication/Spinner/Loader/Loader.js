import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ color }) => (
  <div
    className={`${styles.Loader} ${
      color === 'white' ? styles.LoaderWhite : ''
    }`}
  ></div>
);

export default Loader;
