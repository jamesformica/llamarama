import filter from 'lodash/filter'
import random from 'lodash/random'

import Tree from '../models/Tree'
import Cactus from '../models/Cactus'

export const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
}

export const SIZES = [SIZE.small, SIZE.medium, SIZE.large]

class BackgroundController {
  constructor(scene) {
    this.scene = scene
    this.backgroundItems = []
  }

  paint(context, speed) {
    this.getItemsOfSize(SIZE.small).map(i => i.paint(context, speed))
    this.getItemsOfSize(SIZE.medium).map(i => i.paint(context, speed))
    this.getItemsOfSize(SIZE.large).map(i => i.paint(context, speed))

    this.backgroundItems = filter(this.backgroundItems, i => i.x2 > 0)

    if (random(0, 120) === 0) {
      if (random(0, 1)) {
        this.backgroundItems.push(new Tree(this.scene))
      } else {
        this.backgroundItems.push(new Cactus(this.scene))
      }
    }
  }

  getItemsOfSize = size => filter(this.backgroundItems, i => i.isSize(size))
}

export default BackgroundController
