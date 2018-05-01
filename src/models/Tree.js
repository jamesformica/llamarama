import random from 'lodash/random'

import Drawable from './Drawable'
import { SIZES } from '../controllers/BackgroundController'
import { getTreeSpeed } from '../helpers/speedHelper'
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
    this.x1 -= getTreeSpeed(speed, this.size)

    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
  }

  isSize = size => size === this.size
}

export default Tree
