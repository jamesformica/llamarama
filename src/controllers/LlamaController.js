import autobind from 'autobind-decorator';
import filter from 'lodash/filter';

import Llama from '../models/Llama';

const FALL_SPEED = 6;
const JUMP_SPEED = 8;
const JUMP_HEIGHT = 180;

class LlamaController {
  constructor(scene) {
    this.scene = scene;

    const desiredHeight = this.scene.height * 0.3;
    this.llama = new Llama(this.scene, desiredHeight);

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

  paint(context, speed, solids) {
    if (this.isJumping) {
      this.calculateJump();
    }

    const intersectingSolids = this.getIntersectingSolid(solids);
    this.adjustLlama(intersectingSolids);

    this.llama.paint(context);
  }

  calculateJump() {
    const nextJump = Math.max(this.llama.y1 - JUMP_SPEED, this.maxJump);
    if (nextJump === this.maxJump) {
      this.isJumping = false;
    }
    this.llama.y1 = nextJump;
  }

  adjustLlama(solids) {
    let shouldFall = false;

    solids.forEach((solid) => {
      if (solid && this.isSolidBelow(solid)) {
        this.llama.y1 = (solid.y1 - this.llama.height);
        this.canJump = true;
      }

      if (solid && this.isSolidAbove(solid)) {
        this.llama.x1 = (solid.x1 - this.llama.width);
        if (solid.y2 !== this.llama.y2) {
          shouldFall = true;
        }
      }
    });

    if (!this.isJumping && (solids.length === 0 || shouldFall)) {
      this.llama.y1 += FALL_SPEED;
      this.canJump = false;
    }
  }

  isSolidBelow = solid => solid.y1 > this.llama.y2;
  isSolidAbove = solid => solid.y1 < this.llama.y2;

  getIntersectingSolid = solids =>
    filter(solids, s => !(
      s.x1 > this.llama.x2 ||
      s.x2 < this.llama.x1 ||
      s.y1 > this.llama.y2 + FALL_SPEED ||
      s.y2 < this.llama.y1 + FALL_SPEED
    ));
}

export default LlamaController;
