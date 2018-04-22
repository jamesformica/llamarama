import autobind from 'autobind-decorator';
import find from 'lodash/find';

import Llama from '../models/Llama';

const FALL_SPEED = 3;
const JUMP_SPEED = 4;
const JUMP_HEIGHT = 200;

class LlamaController {
  constructor() {
    this.llama = new Llama();
    this.isJumping = false;
    this.canJump = false;

    document.addEventListener('keydown', this.onKeyDown);
  }

  @autobind
  onKeyDown(e) {
    if (e.which === 32) {
      if (!this.isJumping && this.canJump) {
        this.isJumping = true;
        this.canJump = false;
        this.maxJump = this.llama.y1 - JUMP_HEIGHT;
      }
    }
  }

  paint(canvas, context, speed, solids) {
    if (this.isJumping) {
      this.calculateJump();
    }

    const solid = this.getIntersectingSolid(solids);
    this.adjustLlamaY(solid);

    this.llama.paint(canvas, context);
  }

  calculateJump() {
    const nextJump = Math.max(this.llama.y1 - JUMP_SPEED, this.maxJump);
    if (nextJump === this.maxJump) {
      this.isJumping = false;
    }
    this.llama.y1 = nextJump;
  }

  adjustLlamaY(solid) {
    let shouldFall = false;

    if (solid && this.isSolidBelow(solid)) {
      this.llama.y1 = (solid.y1 - this.llama.height);
      this.canJump = true;
    }

    if (solid && this.isSolidAbove(solid)) {
      this.llama.x1 = (solid.x1 - this.llama.width);
      shouldFall = true;
    }

    if (!this.isJumping && (!solid || shouldFall)) {
      this.llama.y1 += FALL_SPEED;
      this.canJump = false;
    }
  }

  isSolidBelow = solid => solid.y1 > this.llama.y2;
  isSolidAbove = solid => solid.y1 < this.llama.y2;

  getIntersectingSolid = solids =>
    find(solids, s => !(
      s.x1 > this.llama.x2 ||
      s.x2 < this.llama.x1 ||
      s.y1 > this.llama.y2 + FALL_SPEED ||
      s.y2 < this.llama.y1 + FALL_SPEED
    ));
}

export default LlamaController;
