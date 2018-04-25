export const calculateSize = (originalWidth, originalHeight, desiredHeight) => {
  const height = desiredHeight;
  const ratio = desiredHeight / originalHeight;
  const width = originalWidth * ratio;

  return { width, height };
};
