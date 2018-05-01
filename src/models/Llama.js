import Drawable from './Drawable'

import { calculateSize } from '../helpers/sizeHelper'
import img from '../sprites/llama/llama_walk.png'
import imgJump from '../sprites/llama/llama_jump.png'

const LLAMA_WIDTH = 196
const LLAMA_HEIGHT = 240

class Llama extends Drawable {
  constructor(scene, h) {
    const { width, height } = calculateSize(LLAMA_WIDTH, LLAMA_HEIGHT, h)
    const x = scene.x1 + (scene.width * 0.1)
    const y = scene.y2 - height - 20

    super(x, y, width, height)

    this.img = new Image(LLAMA_WIDTH, LLAMA_HEIGHT)
    this.img.src = img
    this.imgJump = new Image(LLAMA_WIDTH, LLAMA_HEIGHT)
    this.imgJump.src = imgJump

    this.frame = 0
    this.delay = 0
  }

  isSolid = () => true;

  paint(context, speed, isJumping) {
    context.beginPath()

    if (isJumping) {
      context.drawImage(this.imgJump, this.x1, this.y1, this.width, this.height)
    } else {
      context.drawImage(
        this.img,
        LLAMA_WIDTH * this.frame,
        0,
        LLAMA_WIDTH,
        LLAMA_HEIGHT,
        this.x1,
        this.y1,
        this.width,
        this.height
      )
    }

    this.delay += 1

    if (this.delay >= (16 - speed)) {
      this.frame = (this.frame + 1) % 6
      this.delay = 0
    }
  }
}

export default Llama
