class Score {
  constructor(scene) {
    this.fontSize = (scene.height / 3)
    this.x = scene.x2 / 2
    this.y = scene.y1 + 10
    this.score = 0
  }

  getScore = () => (this.score / 10).toFixed(1)

  paint(context) {
    this.score += 1

    context.beginPath()
    context.fillStyle = 'deeppink'
    context.font = `${this.fontSize}px monospace`
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillText(`${this.getScore()}m`, this.x, this.y)
  }
}

export default Score
