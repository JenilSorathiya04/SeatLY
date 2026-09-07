export default function StandGap({ angle, centerX = 600, centerY = 380, radiusX = 565, radiusY = 300 }) {
  const rad = (angle * Math.PI) / 180
  const x = centerX + radiusX * Math.cos(rad)
  const y = centerY + radiusY * Math.sin(rad)
  return <circle className="stand-gap" cx={x} cy={y} r="17" aria-label={`Stand gap ${angle} degrees`} />
}
