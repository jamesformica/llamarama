import Reavas from 'reavas'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'

import { gameover } from '../actions'
import { getMoveSpeed } from '../helpers/speedHelper'
import SceneController from '../controllers/SceneController'

class Game extends Reavas {
  setup(canvas) {
    this.speed = 0.5
    this.sceneController = new SceneController(canvas)

    setInterval(this.updateSpeed, 5000)
  }

  @autobind
  updateSpeed() {
    this.speed = Math.min(this.speed += 0.1, 1)
  }

  paint(canvas, context) {
    const speed = getMoveSpeed(this.speed, this.canvas.width)
    this.sceneController.paint(context, speed)

    const { isGameOver, score } = this.sceneController.isGameOver()
    if (isGameOver) {
      this.props.gameover(score)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  gameover: score => dispatch(gameover(score))
})

export default connect(null, mapDispatchToProps)(Game)
