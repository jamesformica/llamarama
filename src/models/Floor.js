import random from 'lodash/random';

import Drawable from './Drawable';

class Floor extends Drawable {
  constructor(x, y, w, h) {
    super(x, y, w, h);

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
    context.fillRect(this.x1, this.y1, this.width, this.height);
  }
}

export default Floor;
