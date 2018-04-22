import Floor from './Floor';

class Hole extends Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, 1);

    this.colour = 'yellow';
  }

  isSolid = () => false;
}

export default Hole;
