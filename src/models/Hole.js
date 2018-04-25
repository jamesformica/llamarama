import Floor from './Floor';

class Hole extends Floor {
  constructor(x, y, h) {
    super(x, y, h);

    this.colour = 'yellow';
  }

  isSolid = () => false;
}

export default Hole;
