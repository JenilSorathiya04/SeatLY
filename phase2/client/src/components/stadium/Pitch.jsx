export default function Pitch({ centerX = 600, centerY = 380 }) {
  return (
    <g className="pitch" transform={`translate(${centerX} ${centerY})`}>
      <rect x="-115" y="-75" width="230" height="150" rx="12" />
      <rect x="-88" y="-62" width="176" height="124" rx="5" />
      <line x1="0" y1="-62" x2="0" y2="62" />
      <text x="0" y="5" textAnchor="middle">PITCH</text>
    </g>
  )
}
