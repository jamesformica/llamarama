import Drawable from './Drawable'

import { calculateSize } from '../helpers/sizeHelper'

import banana from '../sprites/banana.png'

const BANANA_WIDTH = 150
const BANANA_HEIGHT = 61

class Banana extends Drawable {
  constructor(scene, h) {
    const { width, height } = calculateSize(BANANA_WIDTH, BANANA_HEIGHT, h)
    const y = scene.y2 - height

    super(scene.x2, y, width, height)
    this.img = new Image(BANANA_WIDTH, BANANA_HEIGHT)
    this.img.src = banana
  }

  isSolid = () => false

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
  }
}

export default Banana
