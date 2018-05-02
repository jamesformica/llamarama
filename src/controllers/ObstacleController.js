import filter from 'lodash/filter'
import random from 'lodash/random'

import { fiftyfifty } from '../helpers/luckHelper'
import Barrel from '../models/Barrel'
import Banana from '../models/Banana'

class ObstacleController {
  constructor(scene) {
    this.scene = scene
    this.obstacles = []
  }

  paint(context, speed, canPlaceObstacle) {
    this.obstacles.forEach(o => o.paint(context, speed))
    this.obstacles = filter(this.obstacles, o => o.x2 > 0)

    if (canPlaceObstacle && random(0, 150) === 0) {
      if (fiftyfifty()) {
        const desiredHeight = this.scene.height * 0.2
        this.obstacles.push(new Barrel(this.scene, desiredHeight))
      } else {
        const desiredHeight = this.scene.height * 0.1
        this.obstacles.push(new Banana(this.scene, desiredHeight))
      }
    }
  }

  getBananas = () => filter(this.obstacles, o => !o.isSolid())

  getBarrels = () => filter(this.obstacles, o => o.isSolid())
}

export default ObstacleController
