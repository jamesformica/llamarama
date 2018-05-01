import { SIZE } from '../controllers/BackgroundController'

export const calculateSize = (originalWidth, originalHeight, desiredHeight) => {
  const height = desiredHeight
  const ratio = desiredHeight / originalHeight
  const width = originalWidth * ratio

  return { width, height }
}

export const getDesiredTreeHeight = (size, { height }) => {
  switch (size) {
    case SIZE.small:
      return height * 0.15
    case SIZE.medium:
      return height * 0.3
    case SIZE.large:
      return height * 0.6
    default:
      return 0
  }
}

export const getDesiredMountainHeight = (size, { height }) => {
  switch (size) {
    case SIZE.small:
      return height * 0.2
    case SIZE.medium:
      return height * 0.4
    case SIZE.large:
      return height * 0.6
    default:
      return 0
  }
}
