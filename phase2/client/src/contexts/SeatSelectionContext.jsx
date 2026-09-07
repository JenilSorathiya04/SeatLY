import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { TIER_PRICES } from '../utils/stadiumGeometry'

const SeatSelectionContext = createContext(null)
const MAX_SEATS = 8

export function SeatSelectionProvider({ children }) {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [activeEventId, setActiveEventId] = useState(null)
  const [selectionMessage, setSelectionMessage] = useState('')

  const beginSelection = useCallback((eventId) => {
    setActiveEventId((current) => {
      if (current && current !== eventId) setSelectedSeats([])
      return eventId
    })
    setSelectionMessage('')
  }, [])

  const toggleSeat = useCallback((seat) => {
    if (!seat || seat.status !== 'available') {
      setSelectionMessage('That seat is currently unavailable. Please choose another one.')
      return
    }
    setSelectedSeats((current) => {
      if (current.some((item) => item.seatId === seat.seatId)) {
        setSelectionMessage('')
        return current.filter((item) => item.seatId !== seat.seatId)
      }
      if (current.length >= MAX_SEATS) {
        setSelectionMessage(`You can select up to ${MAX_SEATS} seats in one booking.`)
        return current
      }
      setSelectionMessage('')
      return [...current, seat]
    })
  }, [])

  const removeSeat = useCallback((seatId) => setSelectedSeats((current) => current.filter((seat) => seat.seatId !== seatId)), [])
  const clearSelection = useCallback(() => { setSelectedSeats([]); setSelectionMessage('') }, [])

  const value = useMemo(() => {
    const subtotal = selectedSeats.reduce((sum, seat) => sum + (seat.price || TIER_PRICES[seat.tier]), 0)
    const convenienceFee = selectedSeats.length ? Math.max(99, Math.round(subtotal * 0.025)) : 0
    return {
      selectedSeats, activeEventId, seatCount: selectedSeats.length, subtotal, convenienceFee,
      total: subtotal + convenienceFee, maxSeats: MAX_SEATS, selectionMessage,
      beginSelection, toggleSeat, removeSeat, clearSelection,
    }
  }, [activeEventId, beginSelection, clearSelection, removeSeat, selectedSeats, selectionMessage, toggleSeat])

  return <SeatSelectionContext.Provider value={value}>{children}</SeatSelectionContext.Provider>
}

export function useSeatSelection() {
  const context = useContext(SeatSelectionContext)
  if (!context) throw new Error('useSeatSelection must be used inside SeatSelectionProvider')
  return context
}
