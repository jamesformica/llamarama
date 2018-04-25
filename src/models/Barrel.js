import Drawable from './Drawable';

import { calculateSize } from '../helpers/sizeHelper';

const BARREL_WIDTH = 90;
const BARREL_HEIGHT = 120;

class Barrel extends Drawable {
  constructor(scene, h) {
    const { width, height } = calculateSize(BARREL_WIDTH, BARREL_HEIGHT, h);
    const y = scene.y2 - height;

    super(scene.x2, y, width, height);
  }

  isSolid = () => true;

  paint(context, speed) {
    this.x1 -= speed;

    context.beginPath();
    context.fillStyle = 'brown';
    context.fillRect(this.x1, this.y1, this.width, this.height);
  }
}

export default Barrel;
