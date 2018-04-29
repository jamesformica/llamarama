import Floor from './Floor'

class Hole extends Floor {
  constructor(x, y, h) {
    super(x, y, h)

    this.colour = 'yellow'
  }

  isSolid = () => false;

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.fillStyle = this.colour
    context.fillRect(this.x1, this.y1, this.width, this.height)
  }
}

export default Hole
