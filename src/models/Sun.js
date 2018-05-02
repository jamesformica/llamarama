import Drawable from './Drawable'

import { calculateSize } from '../helpers/sizeHelper'

import sun from '../sprites/sun.png'

const SUN_WIDTH = 200
const SUN_HEIGHT = 200

class Sun extends Drawable {
  constructor(scene) {
    const desiredHeight = scene.height / 3
    const { width, height } = calculateSize(SUN_WIDTH, SUN_HEIGHT, desiredHeight)
    const x = scene.x2 - width
    const y = scene.y1 - (height / 2)

    super(x, y, width, height)

    this.degree = 0
    this.img = new Image(SUN_WIDTH, SUN_HEIGHT)
    this.img.src = sun
  }

  get halfX() { return this.x1 + (this.width / 2) }
  get halfY() { return this.y1 + (this.height / 2) }

  isSolid = () => true

  paint(context) {
    this.degree = (this.degree + 0.1) % 360

    context.save()

    context.beginPath()
    context.translate(this.halfX, this.halfY)
    context.rotate(this.degree * (Math.PI / 180))
    context.drawImage(this.img, this.width * -0.5, this.height * -0.5, this.width, this.height)

    context.restore()
  }
}

export default Sun
