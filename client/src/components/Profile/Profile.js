import React, { Component } from 'react';
import styles from './Profile.module.css';
import { connect } from 'react-redux';

import Row from '../Main/Layout/Grid/Row';
import ProfileForm from './ProfileForm/ProfileForm';

class Profile extends Component {
  // renderContent() {
  //   const { username, primaryEmail } = this.props.auth;
  //   return (
  //     <div className={styles.ProfileCard}>
  //       <h2 className={styles.ProfileCardTitle}>Account</h2>
  //       <div className={styles.ProfileCardContent}>
  //         <div className={styles.ProfileItem}>
  //           <div className={styles.ProfileItemName}>Username</div>
  //           <div className={styles.ProfileItemValue}>{username}</div>
  //         </div>
  //         <div className={styles.ProfileItem}>
  //           <div className={styles.ProfileItemName}>Email</div>
  //           <div className={styles.ProfileItemValue}>{primaryEmail}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  renderContent() {
    const { username, primaryEmail } = this.props.auth;
    return (
      <div className={styles.ProfileCard}>
        <h2 className={styles.ProfileCardTitle}>Account</h2>
        <ProfileForm username={username} email={primaryEmail} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.Profile}>
        <Row>
          <div className={styles.ProfileWrapper}>
            {this.props.auth ? this.renderContent() : null}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Profile);
