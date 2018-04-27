import random from 'lodash/random'

import { SIZE, SIZES } from '../controllers/BackgroundController'
import { calculateSize } from '../helpers/sizeHelper'
import Drawable from './Drawable'

const TREE_WIDTH = 200
const TREE_HEIGHT = 100

const getDesiredHeight = (size, { height }) => {
  switch (size) {
    case SIZE.small:
      return height * 0.25
    case SIZE.medium:
      return height * 0.5
    case SIZE.large:
      return height * 0.8
    default:
      return 0
  }
}

class Tree extends Drawable {
  constructor(scene) {
    const size = SIZES[random(0, SIZES.length - 1)]
    const desiredHeight = getDesiredHeight(size, scene)

    const { width, height } = calculateSize(TREE_WIDTH, TREE_HEIGHT, desiredHeight)
    const y = scene.y2 - height
    super(scene.x2, y, width, height)

    this.size = size
  }

  paint(context, speed) {
    this.x1 -= this.getSpeed(speed)

    context.beginPath()
    context.fillStyle = 'hotpink'
    context.fillRect(this.x1, this.y1, this.width, this.height)
  }

  getSpeed = (speed) => {
    switch (this.size) {
      case SIZE.small:
        return speed * 0.25
      case SIZE.medium:
        return speed * 0.5
      case SIZE.large:
        return speed * 0.8
      default:
        return speed
    }
  }

  isSize = size => size === this.size
}

export default Tree
