import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { play } from '../../actions'
import bg from './llama_bg.jpg'

import styles from './Menu.css'

class Menu extends Component {
  componentDidMount() {
    if (this.button) {
      this.button.focus()
    }
  }

  render() {
    const { isReady, onStart, score } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.menu} style={{ backgroundImage: `url('${bg}')` }}>
          <h1 className={styles.title}>Llamarama</h1>
          <p className={styles.text}>Press &apos;space&apos; or click to jump!</p>
          <p className={styles.text}>
            Your score
          <br />
            <span className={styles.score}>{score} meters</span>
          </p>
          {isReady
            ? (
              <button className={styles.start} onClick={onStart} ref={(b) => { this.button = b }}>
                START
              </button>
            ) : (
              <button className={styles.start}>LOADING...</button>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.score,
  isReady: state.ready
})

const mapDispatchToProps = dispatch => ({
  onStart: () => dispatch(play())
})

Menu.propTypes = {
  onStart: PropTypes.func.isRequired,
  score: PropTypes.string.isRequired,
  isReady: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
