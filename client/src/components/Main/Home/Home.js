import React from 'react';
import Row from '../Layout/Grid/Row';
import Button from '../Button/Button';
import styles from './Home.module.css';

const Home = () => (
  <div className={styles.Home}>
    <Row>
      <div className={styles.TextContainer}>
        <h1 className={styles.Title}>Find The Perfect Trail</h1>
        <div className={styles.SubHeader}>
          <h3>Connect.</h3>
          <h3>Share.</h3>
          <h3>Learn.</h3>
        </div>
        <Button text="Take The First Step" level="warm" to="/trails/new" />
      </div>
    </Row>
  </div>
);

export default Home;
