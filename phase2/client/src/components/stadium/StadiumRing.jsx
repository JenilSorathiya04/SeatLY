import Seat from './Seat'

export default function StadiumRing({ seats, selectedSeats, onToggle, price }) {
  return (
    <g>
      {seats.map((seat) => (
        <Seat
          key={seat.seatId}
          seat={seat}
          selected={selectedSeats.has(seat.seatId)}
          onToggle={onToggle}
          price={price}
        />
      ))}
    </g>
  )
}
