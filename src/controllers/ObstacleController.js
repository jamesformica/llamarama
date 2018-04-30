import filter from 'lodash/filter'
import random from 'lodash/random'

import Barrel from '../models/Barrel'

class ObstacleController {
  constructor(scene) {
    this.scene = scene
    this.obstacles = []
  }

  paint(context, speed, canPlaceObstacle) {
    this.obstacles.forEach(o => o.paint(context, speed))

    this.obstacles = filter(this.obstacles, o => o.x2 > 0)

    if (canPlaceObstacle && random(0, 100) === 0) {
      const desiredHeight = this.scene.height * 0.2

      this.obstacles.push(new Barrel(this.scene, desiredHeight))
    }
  }
}

export default ObstacleController
