import Button from '../components/common/Button'
import { useSeatSelection } from '../contexts/SeatSelectionContext'
import { getEvent } from '../services/eventService'

export default function BookingSuccess() {
  const { selectedSeats, total, activeEventId } = useSeatSelection()
  const event = getEvent(activeEventId)
  const seats = selectedSeats.length ? selectedSeats.map((seat) => seat.seatId).join(' · ') : 'Your selected seats'
  const bookingId = 'SLY-482091'
  return <main className="page-shell"><section className="container success-page"><div className="confirmation-mark">✓</div><p className="eyebrow">Booking confirmed</p><h1>Your match day is set.</h1><p className="muted">Booking ID: <strong>{bookingId}</strong>. Your confirmation and entry details have been sent to aarav@example.com.</p><div className="success-ticket"><div><span className="eyebrow">{event.title}</span><h2>{event.day} {event.month} 2026 · {event.time}</h2><p>{event.venue} · {event.city}</p></div><div><span className="eyebrow">Seats</span><strong>{seats}</strong></div><div><span className="eyebrow">Total paid</span><strong>₹{(total || event.from).toLocaleString('en-IN')}</strong></div></div><div className="success-actions"><Button href={`/booking/${bookingId}`}>View booking</Button><Button href="/">Back to home</Button></div></section></main>
}
