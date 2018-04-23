import Reavas from 'reavas';
import filter from 'lodash/filter';
import autobind from 'autobind-decorator';

import LlamaController from '../controllers/LlamaController';
import FloorController from '../controllers/FloorController';
import ObstacleController from '../controllers/ObstacleController';

class Game extends Reavas {
  setup(canvas) {
    this.speed = 8;
    this.llamaController = new LlamaController();
    this.floorController = new FloorController(canvas);
    this.obstacleController = new ObstacleController();

    setInterval(this.updateSpeed, 30000);
  }

  @autobind
  updateSpeed() {
    this.speed = Math.min(this.speed += 2, 12);
  }

  paint(canvas, context) {
    this.floorController.paint(canvas, context, this.speed);
    this.obstacleController.paint(canvas, context, this.speed);
    this.llamaController.paint(canvas, context, this.speed, this.getSolids());
  }

  getSolids = () => [
    ...filter(this.floorController.floors, f => f.isSolid()),
    ...filter(this.obstacleController.obstacles, o => o.isSolid())
  ]
}

export default Game;
