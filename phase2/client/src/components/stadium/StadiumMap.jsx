import { useMemo } from 'react'
import StadiumSVG from './StadiumSVG'
import { generateStadium, STADIUM_CONFIG } from '../../utils/stadiumGeometry'

export default function StadiumMap() {
  const stadium = useMemo(() => {
    const generated = generateStadium(STADIUM_CONFIG)
    const seats = generated.seats.map((seat, index) => ({ ...seat, status: index % 83 === 0 ? 'booked' : 'available' }))
    const byId = new Map(seats.map((seat) => [seat.seatId, seat]))
    return { ...generated, seats, tiers: generated.tiers.map((tier) => ({ ...tier, seats: tier.seats.map((seat) => byId.get(seat.seatId)) })) }
  }, [])
  return <div className="stadium-preview"><div className="stadium-preview__label"><span>LIVE SEAT MAP</span><strong>2,700+ seats, one clear view.</strong></div><StadiumSVG stadium={stadium} selectedSeats={new Set()} onToggle={() => {}} /><div className="stadium-preview__caption"><span>Explore by tier, price and availability</span><a href="/events/india-australia/seats">Open the seat map →</a></div></div>
}
