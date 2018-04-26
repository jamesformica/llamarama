import last from 'lodash/last';
import filter from 'lodash/filter';
import random from 'lodash/random';

import Floor from '../models/Floor';
import Hole from '../models/Hole';

class FloorController {
  constructor(scene) {
    this.scene = scene;
    this.floors = [];

    do {
      this.addFloor();
    } while (last(this.floors).x2 < this.scene.x2);
  }

  paint(context, speed) {
    this.floors.forEach(f => f.paint(context, speed));

    this.floors = filter(this.floors, f => f.x2 > 0);

    if (last(this.floors).x2 <= this.scene.x2) {
      this.addFloor();
    }
  }

  addFloor() {
    const lastFloor = last(this.floors);
    const x = lastFloor ? lastFloor.x2 : 0;
    const y = this.scene.y1;

    if (this.canPlaceHole() && random(0, 5) === 0) {
      this.floors.push(
        new Hole(x, y, this.scene.height)
      );
    } else {
      this.floors.push(
        new Floor(x, y, this.scene.height)
      );
    }
  }

  canPlaceHole = () => (
    this.floors.length > 4 &&
    (
      this.floors[this.floors.length - 1].isSolid() ||
      this.floors[this.floors.length - 2].isSolid()
    )
  )
}

export default FloorController;
