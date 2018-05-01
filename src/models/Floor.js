import Drawable from './Drawable'
import { calculateSize } from '../helpers/sizeHelper'
import img from '../sprites/floor.png'

const STRETCH_AMOUNT = 16
const FULL_FLOOR_WIDTH = 600
export const FLOOR_WIDTH = FULL_FLOOR_WIDTH / 3
export const FLOOR_HEIGHT = 175

class Floor extends Drawable {
  constructor(x, y, h, frame) {
    const { width, height } = calculateSize(FLOOR_WIDTH, FLOOR_HEIGHT, h)

    super(x, y, width, height)
    this.frame = frame
    this.setImage()
  }

  setImage() {
    this.img = new Image(FULL_FLOOR_WIDTH, FLOOR_HEIGHT)
    this.img.src = img
  }

  isSolid = () => true;

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.drawImage(
      this.img,
      this.frame * FLOOR_WIDTH,
      0,
      FLOOR_WIDTH,
      FLOOR_HEIGHT,
      this.x1,
      this.y1 - STRETCH_AMOUNT,
      this.width,
      this.height + STRETCH_AMOUNT
    )
  }
}

export default Floor
