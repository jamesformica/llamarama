import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play } from '../../actions';

import styles from './Menu.css';

const Menu = ({ onStart, score }) => (
  <div className={styles.wrapper}>
    <div className={styles.menu}>
      <h1 className={styles.title}>Llamarama</h1>
      <p>Press &apos;space&apos; or click to jump!</p>
      <p className={styles.text}>
        Your score
        <br />
        <span className={styles.score}>{score}</span>
      </p>
      <button className={styles.start} onClick={onStart}>START</button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  score: state.score
});

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(play())
});

Menu.propTypes = {
  onStart: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
