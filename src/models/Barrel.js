import Drawable from './Drawable'

import { calculateSize } from '../helpers/sizeHelper'

import img from '../sprites/barrel/barrel.png'

const BARREL_WIDTH = 200
const BARREL_HEIGHT = 271

class Barrel extends Drawable {
  constructor(scene, h) {
    const { width, height } = calculateSize(BARREL_WIDTH, BARREL_HEIGHT, h)
    const y = scene.y2 - height

    super(scene.x2, y, width, height)
    this.img = new Image(BARREL_WIDTH, BARREL_HEIGHT)
    this.img.src = img
  }

  isSolid = () => true;

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
  }
}

export default Barrel
