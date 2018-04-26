import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play } from '../../actions';

import styles from './Menu.css';

const Menu = ({ onStart }) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>
      <h1 className={styles.title}>Llamarama</h1>
      <button className={styles.start} onClick={onStart}>START</button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(play())
});

Menu.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Menu);
