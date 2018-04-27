import filter from 'lodash/filter'
import random from 'lodash/random'

import Barrel from '../models/Barrel'

class ObstacleController {
  constructor(scene) {
    this.scene = scene
    this.obstacles = []
  }

  paint(context, speed) {
    this.obstacles.forEach(o => o.paint(context, speed))

    this.obstacles = filter(this.obstacles, o => o.x2 > 0)

    if (random(0, 120) === 0) {
      const desiredHeight = this.scene.height * 0.2
      this.obstacles.push(new Barrel(this.scene, desiredHeight))
    }
  }
}

export default ObstacleController
