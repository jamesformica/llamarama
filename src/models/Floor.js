import random from 'lodash/random';

import Drawable from './Drawable';

class Floor extends Drawable {
  constructor(x, y, w, h, percent) {
    const realY = y + (h * percent);
    super(x, realY, w, h);

    this.originalY = y;

    const colours = [
      'crimson',
      'steelblue',
      'purple'
    ];

    this.colour = colours[random(0, colours.length - 1)];
  }

  isSolid = () => true;

  paint(canvas, context, speed) {
    this.x1 -= speed;

    context.beginPath();
    context.fillStyle = this.colour;
    context.fillRect(this.x1, this.originalY, this.width, this.height);
  }
}

export default Floor;
