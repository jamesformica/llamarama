import Reavas from 'reavas';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { gameover } from '../actions';
import SceneController from '../controllers/SceneController';

class Game extends Reavas {
  setup(canvas) {
    this.speed = 8;
    this.sceneController = new SceneController(canvas);

    setInterval(this.updateSpeed, 20000);
  }

  @autobind
  updateSpeed() {
    this.speed = Math.min(this.speed += 2, 12);
  }

  paint(canvas, context) {
    this.sceneController.paint(context, this.speed);

    if (this.sceneController.isGameOver()) {
      this.props.gameover();
    }
  }
}

const mapDispatchToProps = dispatch => ({
  gameover: () => dispatch(gameover())
});

export default connect(null, mapDispatchToProps)(Game);
