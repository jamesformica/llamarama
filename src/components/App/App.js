import React, { Fragment } from 'react';

import Game from '../../models/Game';
import styles from './App.css';

const canvasId = 'llamarama';

const App = () => (
  <Fragment>
    <canvas id={canvasId} className={styles.canvas} />
    <Game canvasId={canvasId} />
  </Fragment>
);

export default App;
