import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu from '../Menu/Menu'
import Game from '../../models/Game'
import styles from './App.css'

const canvasId = 'llamarama'

const App = ({ isPlaying }) => (
  <Fragment>
    <canvas id={canvasId} className={styles.canvas} />
    {isPlaying && <Game canvasId={canvasId} />}
    {!isPlaying && <Menu />}
  </Fragment>
)

const mapStateToProps = state => ({
  isPlaying: state.isPlaying
})

App.propTypes = {
  isPlaying: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(App)
