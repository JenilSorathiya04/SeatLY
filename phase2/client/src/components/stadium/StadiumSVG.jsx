import { memo, useMemo } from 'react'
import { generateStadium, TIER_PRICES, STADIUM_CONFIG } from '../../utils/stadiumGeometry'
import StadiumRing from './StadiumRing'
import Pitch from './Pitch'
import StandGap from './StandGap'

function StadiumSVG({ selectedSeats, onToggle, stadium: providedStadium, visibleSeatIds, viewBox, onPointerDown, onPointerMove, onPointerUp }) {
  const generatedStadium = useMemo(() => generateStadium(STADIUM_CONFIG), [])
  const stadium = providedStadium || generatedStadium
  const visible = visibleSeatIds || null

  return (
    <svg
      className="stadium"
      viewBox={viewBox || `0 0 ${stadium.width} ${stadium.height}`}
      role="img"
      aria-label="Interactive SeatLY cricket stadium seat map"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <defs>
        <filter id="stadiumShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" floodOpacity=".10" /></filter>
      </defs>
      <ellipse className="stadium-shell" cx={stadium.centerX} cy={stadium.centerY} rx="570" ry="305" filter="url(#stadiumShadow)" />
      {[...Array(stadium.rings)].map((_, index) => {
        const r = 0.39 + index * 0.055
        return <ellipse key={`ring-outline-${index + 1}`} className="ring-outline" cx={stadium.centerX} cy={stadium.centerY} rx={552 * r} ry={304 * r} />
      })}
      {stadium.angularGaps.gaps.map((angle) => <StandGap key={angle} angle={angle} />)}
      {stadium.tiers.map((tier) => (
        <StadiumRing key={tier.key} seats={visible ? tier.seats.filter((seat) => visible.has(seat.seatId)) : tier.seats} selectedSeats={selectedSeats} onToggle={onToggle} price={TIER_PRICES[tier.key]} />
      ))}
      <Pitch centerX={stadium.centerX} centerY={stadium.centerY} />
    </svg>
  )
}

export default memo(StadiumSVG)
