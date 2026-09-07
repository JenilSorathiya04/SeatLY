import { memo, useState } from 'react'

const TIER_COLORS = { premium: '#eb9b32', tier1: '#6674df', tier2: '#309b93', tier3: '#8792a5' }
const UNAVAILABLE = new Set(['booked', 'blocked', 'held'])

function Seat({ seat, selected, onToggle, price }) {
  const [hovered, setHovered] = useState(false)
  const unavailable = UNAVAILABLE.has(seat.status)
  const fill = selected ? '#152842' : unavailable ? (seat.status === 'held' ? '#d8b56a' : '#d9dde3') : TIER_COLORS[seat.tier]
  const label = `${seat.seatId}. ${seat.tierLabel || seat.tier}. ₹${price.toLocaleString('en-IN')}. ${seat.status}.`

  return (
    <g
      className={`seat seat--${seat.status} ${selected ? 'seat--selected' : ''}`}
      transform={`translate(${seat.x} ${seat.y})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(event) => { event.stopPropagation(); if (!unavailable) onToggle(seat.seatId) }}
      role="button"
      tabIndex={unavailable ? -1 : 0}
      aria-label={label}
      aria-disabled={unavailable}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !unavailable) { event.preventDefault(); onToggle(seat.seatId) }
      }}
    >
      <circle r={selected ? '4.8' : '3.1'} fill={fill} stroke={selected ? '#fff' : 'rgba(255,255,255,.9)'} strokeWidth={selected ? '1.8' : '0.8'} />
      {hovered && (
        <g className="seat-tooltip" pointerEvents="none">
          <rect x="9" y="-61" width="166" height="53" rx="7" />
          <text x="18" y="-43">{seat.seatId} · {seat.tierLabel || seat.tier}</text>
          <text x="18" y="-25">₹{price.toLocaleString('en-IN')} · {seat.status}</text>
        </g>
      )}
    </g>
  )
}

export default memo(Seat, (prev, next) => prev.seat === next.seat && prev.selected === next.selected && prev.price === next.price)
