import { SIZE } from '../controllers/BackgroundController'

export const getMoveSpeed = (num, size) => (num / 100) * size

export const getTreeSpeed = (speed, size) => {
  switch (size) {
    case SIZE.small:
      return speed * 0.25
    case SIZE.medium:
      return speed * 0.5
    case SIZE.large:
      return speed * 0.8
    default:
      return speed
  }
}
