import filter from 'lodash/filter'
import random from 'lodash/random'
import last from 'lodash/last'

import { fiftyfifty } from '../helpers/luckHelper'
import Tree from '../models/Tree'
import Tree2 from '../models/Tree2'
import Mountain from '../models/Mountain'
import Sky from '../sprites/sky.jpg'

export const SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
}

export const SIZES = [SIZE.small, SIZE.medium, SIZE.large]

class BackgroundController {
  constructor(scene, canvas) {
    this.canvas = canvas
    this.scene = scene
    this.trees = []
    this.mountains = []

    do {
      this.addMountain()
    } while (last(this.mountains).x2 < this.scene.x2)

    this.sky = new Image(1000, 707)
    this.sky.src = Sky
  }

  paint(context, speed) {
    this.paintSky(context)

    this.mountains.map(m => m.paint(context, speed))

    this.getItemsOfSize(SIZE.small).map(i => i.paint(context, speed))
    this.getItemsOfSize(SIZE.medium).map(i => i.paint(context, speed))
    this.getItemsOfSize(SIZE.large).map(i => i.paint(context, speed))

    this.trees = filter(this.trees, i => i.x2 > 0)
    this.mountains = filter(this.mountains, m => m.x2 > 0)

    if (random(0, 70) === 0) {
      if (fiftyfifty()) {
        this.trees.push(new Tree(this.scene))
      } else {
        this.trees.push(new Tree2(this.scene))
      }
    }

    if (last(this.mountains).x2 < this.scene.x2) {
      this.addMountain()
    }
  }

  addMountain() {
    const lastMountain = last(this.mountains)
    const x = lastMountain ? lastMountain.x2 : 0
    this.mountains.push(new Mountain(x, this.scene))
  }

  paintSky = (context) => {
    context.beginPath()
    context.drawImage(this.sky, 0, 0, this.canvas.width, this.canvas.height)
  }

  getItemsOfSize = size => filter(this.trees, i => i.isSize(size))
}

export default BackgroundController
