import Reavas from 'reavas';
import filter from 'lodash/filter';
import autobind from 'autobind-decorator';

import SceneController from '../controllers/SceneController';
import LlamaController from '../controllers/LlamaController';

class Game extends Reavas {
  setup(canvas) {
    this.speed = 8;
    this.sceneController = new SceneController(canvas);
    this.llamaController = new LlamaController();

    setInterval(this.updateSpeed, 20000);
  }

  @autobind
  updateSpeed() {
    this.speed = Math.min(this.speed += 2, 12);
  }

  paint(canvas, context) {
    this.sceneController.paint(context, this.speed);
    this.llamaController.paint(canvas, context, this.speed, this.getSolids());
  }

  getSolids = () => [
    ...filter(this.sceneController.floorController.floors, f => f.isSolid()),
    ...filter(this.sceneController.obstacleController.obstacles, o => o.isSolid())
  ]
}

export default Game;
