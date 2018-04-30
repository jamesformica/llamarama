import random from 'lodash/random'

import Drawable from './Drawable'
import { SIZES } from '../controllers/BackgroundController'
import { calculateSize, getDesiredMountainHeight } from '../helpers/sizeHelper'

const MOUNTAIN_WIDTH = 300
const MOUNTAIN_HEIGHT = 200

class Mountain extends Drawable {
  constructor(x, scene) {
    const size = SIZES[random(0, SIZES.length - 1)]
    const desiredHeight = getDesiredMountainHeight(size, scene)

    const { width, height } = calculateSize(MOUNTAIN_WIDTH, MOUNTAIN_HEIGHT, desiredHeight)
    const y = scene.y2 - height
    super(x, y, width, height)
  }

  paint(context, speed) {
    this.x1 -= speed * 0.1

    context.beginPath()
    context.fillStyle = 'yellow'
    context.fillRect(this.x1, this.y1, this.width, this.height)
  }
}

export default Mountain
