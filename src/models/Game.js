import Reavas from 'reavas';
import filter from 'lodash/filter';

import LlamaController from '../controllers/LlamaController';
import FloorController from '../controllers/FloorController';

class Game extends Reavas {
  setup(canvas) {
    this.speed = 4;
    this.llamaController = new LlamaController();
    this.floorController = new FloorController(canvas);
  }

  paint(canvas, context) {
    this.floorController.paint(canvas, context, this.speed);
    this.llamaController.paint(canvas, context, this.speed, this.getSolids());
  }

  getSolids = () => [
    ...filter(this.floorController.floors, f => f.isSolid())
  ]
}

export default Game;
