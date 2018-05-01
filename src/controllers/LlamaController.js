import autobind from 'autobind-decorator'
import filter from 'lodash/filter'

import Llama from '../models/Llama'

class LlamaController {
  constructor(scene, canvas) {
    this.scene = scene
    this.canvas = canvas

    const desiredHeight = this.scene.height * 0.3
    this.llama = new Llama(this.scene, desiredHeight)

    this.isJumping = false
    this.canJump = false
    this.isSliding = false

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
    if (!this.isSliding && !this.isJumping && this.canJump) {
      this.isJumping = true
      this.canJump = false
      this.maxJump = this.llama.y1 - (this.scene.height * 0.4)
    }
  }

  @autobind
  doFall() {
    if (this.isJumping && !this.canJump) {
      this.isJumping = false
    }
  }

  paint(context, speed, solids, bananas) {
    this.fallSpeed = speed * 1.1
    this.jumpSpeed = speed * 1.2

    if (this.isJumping) {
      this.calculateJump()
    }

    const intersectingSolids = this.getIntersectingItems(solids)
    this.adjustLlama(intersectingSolids)

    const intersectingBanana = this.getIntersectingItems(bananas)
    this.isSliding = intersectingBanana.length > 0

    this.llama.paint(context, speed, !this.canJump, this.isSliding)
  }

  calculateJump() {
    const nextJump = Math.max(this.llama.y1 - this.jumpSpeed, this.maxJump)
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
      this.llama.y1 += this.fallSpeed
      this.canJump = false
    }
  }

  getIntersectingItems = items =>
    filter(items, s => !(
      s.x1 > this.llama.x2 ||
      s.x2 < this.llama.x1 ||
      s.y1 > this.llama.y2 + this.fallSpeed ||
      s.y2 < this.llama.y1 + this.fallSpeed
    ));

  isGameOver = () => (this.llama.x2 < 0 || this.llama.y1 > this.canvas.height)
}

export default LlamaController
