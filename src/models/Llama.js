import Drawable from './Drawable'

import { calculateSize } from '../helpers/sizeHelper'
import img from '../sprites/llama/llama_orig.png'

const LLAMA_WIDTH = 196
const LLAMA_HEIGHT = 240

class Llama extends Drawable {
  constructor(scene, h) {
    const { width, height } = calculateSize(LLAMA_WIDTH, LLAMA_HEIGHT, h)
    const x = scene.x1 + 200
    const y = scene.y2 - height - 20

    super(x, y, width, height)
    this.ready = false

    this.img = new Image(LLAMA_WIDTH, LLAMA_HEIGHT)
    this.img.src = img
  }

  isSolid = () => true;

  paint(context) {
    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
  }
}

export default Llama
