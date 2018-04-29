import autobind from 'autobind-decorator'
import filter from 'lodash/filter'

import Llama from '../models/Llama'

const FALL_SPEED = 6
const JUMP_SPEED = 8
const JUMP_HEIGHT = 180

class LlamaController {
  constructor(scene, canvas) {
    this.scene = scene
    this.canvas = canvas

    const desiredHeight = this.scene.height * 0.3
    this.llama = new Llama(this.scene, desiredHeight)

    this.isJumping = false
    this.canJump = false

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)

    this.canvas.addEventListener('mousedown', this.doJump)
    this.canvas.addEventListener('mouseup', this.doFall)

    this.canvas.addEventListener('touchstart', this.doJump)
    this.canvas.addEventListener('touchend', this.doFall)
  }

  onKeyDown = e => e.which === 32 && this.doJump()

  onKeyUp = e => e.which === 32 && this.doFall()

  @autobind
  doJump() {
    if (!this.isJumping && this.canJump) {
      this.isJumping = true
      this.canJump = false
      this.maxJump = this.llama.y1 - JUMP_HEIGHT
    }
  }

  @autobind
  doFall() {
    if (this.isJumping && !this.canJump) {
      this.isJumping = false
    }
  }

  paint(context, speed, solids) {
    if (this.isJumping) {
      this.calculateJump()
    }

    const intersectingSolids = this.getIntersectingSolid(solids)
    this.adjustLlama(intersectingSolids)

    this.llama.paint(context, speed, this.isJumping)
  }

  calculateJump() {
    const nextJump = Math.max(this.llama.y1 - JUMP_SPEED, this.maxJump)
    if (nextJump === this.maxJump) {
      this.isJumping = false
    }
    this.llama.y1 = nextJump
  }

  adjustLlama(solids) {
    let shouldFall = true

    solids.forEach((solid) => {
      const overlapY = Math.max(0, this.llama.height - (solid.y1 - this.llama.y1))
      const overlapX = Math.max(0, this.llama.width - (solid.x1 - this.llama.x1))

      if (overlapY < overlapX) {
        this.llama.y1 -= overlapY
        this.canJump = true
        shouldFall = false
      } else if (overlapX < overlapY) {
        this.llama.x1 -= overlapX
      }
    })

    if (!this.isJumping && (solids.length === 0 || shouldFall)) {
      this.llama.y1 += FALL_SPEED
      this.canJump = false
    }
  }

  getIntersectingSolid = solids =>
    filter(solids, s => !(
      s.x1 > this.llama.x2 ||
      s.x2 < this.llama.x1 ||
      s.y1 > this.llama.y2 + FALL_SPEED ||
      s.y2 < this.llama.y1 + FALL_SPEED
    ));

  isGameOver = () => (this.llama.x2 < 0 || this.llama.y1 > this.canvas.height)
}

export default LlamaController
