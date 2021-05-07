import React, { Component } from 'react';
import styles from './Register.module.css';

import RegisterForm from './RegisterForm/RegisterForm';
import Success from './Success/Success';

import { IconHappy, IconChat, IconCompass } from '../Icon/Icon';

const renderFeature = ({ icon, title, description }) => (
  <div className={styles.Feature}>
    <div className={styles.FeatureHeader}>
      <div className={styles.Icon}>{icon}</div>
      <h2 className={styles.FeatureTitle}>{title}</h2>
    </div>
    <p className={styles.Description}>{description}</p>
  </div>
);

const renderFeatureSection = () => {
  const features = [
    {
      icon: <IconHappy />,
      title: 'Free account',
      description:
        'Creating a new account is completely free! Start learning and making new connections today.',
    },
    {
      icon: <IconChat />,
      title: 'Join the conversation',
      description:
        'Meet others who share your passion for adventure and discuss your favorite topics.',
    },
    {
      icon: <IconCompass />,
      title: 'Discover new places',
      description:
        'Find new trails to explore!  Read, comment, and ask questions about the most popular hiking destinations.',
    },
  ];

  return (
    <div className={styles.FeatureSection}>
      {features.map(props => renderFeature(props))}
    </div>
  );
};

class Register extends Component {
  state = { registrationComplete: false };

  onRegisterHandler = () => {
    this.setState({ registrationComplete: true });
  };

  render() {
    return (
      <div className={styles.Register}>
        <h1 className={styles.RegisterHeader}>
          Join for free today and start exploring
        </h1>
        <div className={styles.RegisterContent}>
          {renderFeatureSection()}
          <RegisterForm onRegister={this.onRegisterHandler} />
        </div>
        {this.state.registrationComplete && <Success />}
      </div>
    );
  }
}

export default Register;
