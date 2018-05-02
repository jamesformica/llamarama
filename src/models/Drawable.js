class Drawable {
  constructor(x, y, w, h) {
    this.x1 = x
    this.y1 = y
    this.width = w
    this.height = h
  }

  get x2() { return this.x1 + this.width }
  get y2() { return this.y1 + this.height }

  isBanana = () => false

  isSolid = () => { throw new Error('OVERRIDE isSolid() IN IMPLEMENTATION') }

  /* eslint-disable-next-line class-methods-use-this */
  paint() { throw new Error('OVERRIDE paint() IN IMPLEMENTATION') }
}

export default Drawable
