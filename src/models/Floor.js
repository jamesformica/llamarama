import random from 'lodash/random'

import Drawable from './Drawable'
import { calculateSize } from '../helpers/sizeHelper'

const FLOOR_WIDTH = 260
const FLOOR_HEIGHT = 180

class Floor extends Drawable {
  constructor(x, y, h) {
    const { width, height } = calculateSize(FLOOR_WIDTH, FLOOR_HEIGHT, h)
    super(x, y, width, height)

    const colours = ['crimson', 'steelblue', 'purple']
    this.colour = colours[random(0, colours.length - 1)]
  }

  isSolid = () => true;

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.fillStyle = this.colour
    context.fillRect(this.x1, this.y1, this.width, this.height)
  }
}

export default Floor
