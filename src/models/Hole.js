import Floor, { FLOOR_WIDTH, FLOOR_HEIGHT } from './Floor'
import img from '../sprites/hole.png'

class Hole extends Floor {
  setImage() {
    this.img = new Image(FLOOR_WIDTH, FLOOR_HEIGHT)
    this.img.src = img
  }

  isSolid = () => false;

  paint(context, speed) {
    this.x1 -= speed

    context.beginPath()
    context.drawImage(this.img, this.x1, this.y1, this.width, this.height)
  }
}

export default Hole
