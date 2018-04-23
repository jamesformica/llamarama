import Drawable from './Drawable';

class Barrel extends Drawable {
  isSolid = () => true;

  paint(canvas, context, speed) {
    this.x1 -= speed;

    context.beginPath();
    context.fillStyle = 'brown';
    context.fillRect(this.x1, this.y1, this.width, this.height);
  }
}

export default Barrel;
