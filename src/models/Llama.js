import Drawable from './Drawable';

import img from '../sprites/llama/llama_orig.png';

const LLAMA_WIDTH = 196;
const LLAMA_HEIGHT = 240;

class Llama extends Drawable {
  constructor() {
    super(200, 100, LLAMA_WIDTH, LLAMA_HEIGHT);
    this.ready = false;

    this.img = new Image(LLAMA_WIDTH, LLAMA_HEIGHT);
    this.img.src = img;
  }

  isSolid = () => true;

  paint(canvas, context) {
    context.beginPath();
    context.drawImage(this.img, this.x1, this.y1);
  }
}

export default Llama;
