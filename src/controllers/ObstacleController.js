import filter from 'lodash/filter';
import random from 'lodash/random';

import Barrel from '../models/Barrel';

class ObstacleController {
  constructor() {
    this.obstacles = [];
  }

  paint(canvas, context, speed) {
    this.obstacles.forEach(o => o.paint(canvas, context, speed));

    this.obstacles = filter(this.obstacles, o => o.x2 > 0);

    if (random(0, 120) === 0) {
      const y = canvas.height - 180 - 120;
      this.obstacles.push(new Barrel(canvas.width, y, 50, 120));
    }
  }
}

export default ObstacleController;
