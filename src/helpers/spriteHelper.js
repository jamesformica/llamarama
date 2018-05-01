import sprites from '../sprites'
import { ready } from '../actions'
import { store } from '../index'

export const loadSprites = () => {
  const promises = sprites.map(s => (
    new Promise((resolve) => {
      const img = new Image()
      img.src = s
      img.onload = () => resolve(img)
    })
  ))

  Promise.all(promises).then((loadedSprites) => {
    store.dispatch(ready(loadedSprites))
  })
}
