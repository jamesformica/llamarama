import Reavas from 'reavas';
import autobind from 'autobind-decorator';

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
  }
}

export default Game;
