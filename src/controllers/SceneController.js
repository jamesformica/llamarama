import reduce from 'lodash/reduce';

const SCENES = [
  { name: 'top', percent: 10 },
  { name: 'middle', percent: 60 },
  { name: 'bottom', percent: 30 }
];

class SceneController {
  constructor(canvas) {
    this.scenes = this.defineScenes(canvas);
  }

  defineScenes = (canvas) => {
    let currentY1 = 0;

    return reduce(SCENES, (agg, curr) => {
      const currHeight = this.getHeightPercent(curr.percent, canvas.height);
      const currentY2 = currentY1 + currHeight;

      agg[curr.name] = {
        y1: currentY1,
        y2: currentY2,
        height: currHeight,
        percent: curr.percent
      };

      currentY1 = currentY2;
      return agg;
    }, {});
  }

  getHeightPercent = (percent, height) => height * (percent / 100);
}

export default SceneController;
