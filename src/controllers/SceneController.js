import reduce from 'lodash/reduce'
import filter from 'lodash/filter'

import Score from '../models/Score'
import FloorController from '../controllers/FloorController'
import LlamaController from '../controllers/LlamaController'
import ObstacleController from '../controllers/ObstacleController'
import BackgroundController from '../controllers/BackgroundController'

const SCENES = [
  { name: 'top', percent: 10 },
  { name: 'middle', percent: 70, extra: 2 },
  { name: 'bottom', percent: 20 }
]

class SceneController {
  constructor(canvas) {
    this.scenes = this.defineScenes(canvas)

    this.score = new Score(this.scenes.top)
    this.floorController = new FloorController(this.scenes.bottom)
    this.llamaController = new LlamaController(this.scenes.middle, canvas)
    this.obstacleController = new ObstacleController(this.scenes.middle)
    this.backgroundController = new BackgroundController(this.scenes.middle)
  }

  paint(context, speed) {
    this.score.paint(context)
    this.backgroundController.paint(context, speed)
    this.floorController.paint(context, speed)
    this.obstacleController.paint(context, speed)
    this.llamaController.paint(context, speed, this.getSolids())
  }

  defineScenes = (canvas) => {
    let currentY1 = 0

    return reduce(SCENES, (agg, curr) => {
      const currHeight = this.getHeightPercent(curr.percent, canvas.height)
      const currentY2 = currentY1 + currHeight

      agg[curr.name] = {
        x1: 0,
        x2: canvas.width,
        y1: currentY1,
        y2: currentY2 + (curr.extra ? this.getHeightPercent(curr.extra, canvas.height) : 0),
        height: currHeight,
        percent: curr.percent
      }

      currentY1 = currentY2
      return agg
    }, {})
  }

  getHeightPercent = (percent, height) => height * (percent / 100);

  getSolids = () => [
    ...filter(this.floorController.floors, f => f.isSolid()),
    ...filter(this.obstacleController.obstacles, o => o.isSolid())
  ]

  isGameOver = () => ({
    isGameOver: this.llamaController.isGameOver(),
    score: this.score.score
  });
}

export default SceneController
