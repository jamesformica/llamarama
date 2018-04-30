import random from 'lodash/random'

import Drawable from './Drawable'
import { SIZE, SIZES } from '../controllers/BackgroundController'
import { calculateSize, getDesiredTreeHeight } from '../helpers/sizeHelper'

import img from '../sprites/tree/tree.png'

const TREE_WIDTH = 300
const TREE_HEIGHT = 281

class Tree extends Drawable {
  constructor(scene) {
    const size = SIZES[random(0, SIZES.length - 1)]
    const desiredHeight = getDesiredTreeHeight(size, scene)

    const { width, height } = calculateSize(TREE_WIDTH, TREE_HEIGHT, desiredHeight)
    const y = scene.y2 - height
    super(scene.x2, y, width, height)

    this.size = size
    this.img = new Image(TREE_WIDTH, TREE_HEIGHT)
    this.img.src = img
  }

  paint(context, speed) {
    this.x1 -= this.getSpeed(speed)

    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
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
