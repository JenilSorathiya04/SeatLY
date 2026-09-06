import { getStadiumRings } from '../../utils/stadiumGeometry'

export default function StadiumSVG() {
  const rings = getStadiumRings()

  return (
    <svg
      className="stadium"
      viewBox="0 0 800 480"
      role="img"
      aria-label="SeatLY stadium map workspace"
    >
      <ellipse cx="400" cy="240" rx="370" ry="215" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      {rings.map((ring) => (
        <ellipse
          key={ring.id}
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.55"
        />
      ))}
      <rect x="320" y="185" width="160" height="110" rx="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="400" y1="185" x2="400" y2="295" stroke="currentColor" strokeWidth="2" />
      <text x="400" y="247" textAnchor="middle" fontSize="22">PITCH</text>
    </svg>
  )
}
