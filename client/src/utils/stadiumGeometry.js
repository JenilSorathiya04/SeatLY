const DEFAULT_CONFIG = {
  centerX: 400,
  centerY: 240,
  radiusX: 330,
  radiusY: 190,
  rings: 4,
}

export function getStadiumRings(config = {}) {
  const options = { ...DEFAULT_CONFIG, ...config }
  const { centerX, centerY, radiusX, radiusY, rings } = options

  return Array.from({ length: rings }, (_, index) => {
    const scale = 1 - index * 0.17

    return {
      id: `ring-${index + 1}`,
      cx: centerX,
      cy: centerY,
      rx: Math.round(radiusX * scale),
      ry: Math.round(radiusY * scale),
    }
  })
}
