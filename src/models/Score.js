class Score {
  constructor(scene) {
    this.fontSize = (scene.height / 4)
    this.x = scene.x2 - 10
    this.y = scene.y1 + 10
    this.score = 0
  }

  paint(context) {
    this.score += 1

    context.beginPath()
    context.fillStyle = 'black'
    context.font = `${this.fontSize}px Arial`
    context.textAlign = 'right'
    context.textBaseline = 'top'
    context.fillText(`SCORE: ${this.score}`, this.x, this.y)
  }
}

export default Score
