import last from 'lodash/last';
import filter from 'lodash/filter';
import random from 'lodash/random';

import Floor from '../models/Floor';
import Hole from '../models/Hole';

const FLOOR_WIDTH = 260;
const FLOOR_HEIGHT = 180;

class FloorController {
  constructor(canvas) {
    this.canvas = canvas;
    this.floors = [];

    do {
      this.addFloor();
    } while (last(this.floors).x2 < this.canvas.width);
  }

  paint(canvas, context, speed) {
    this.floors.forEach(f => f.paint(canvas, context, speed));

    this.floors = filter(this.floors, f => f.x2 > 0);

    if (last(this.floors).x2 <= this.canvas.width) {
      this.addFloor();
    }
  }

  addFloor() {
    const lastFloor = last(this.floors);
    const x = lastFloor ? lastFloor.x2 : 0;
    const y = this.canvas.height - FLOOR_HEIGHT;

    if (random(0, 5) === 0) {
      this.floors.push(
        new Hole(x, y, FLOOR_WIDTH, FLOOR_HEIGHT)
      );
    } else {
      this.floors.push(
        new Floor(x, y, FLOOR_WIDTH, FLOOR_HEIGHT, 0.5)
      );
    }
  }
}

export default FloorController;
