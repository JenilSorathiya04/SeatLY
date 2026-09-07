import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import StadiumSVG from '../components/stadium/StadiumSVG'
import Button from '../components/common/Button'
import { generateStadium, STADIUM_CONFIG, TIER_META } from '../utils/stadiumGeometry'
import { useSeatSelection } from '../contexts/SeatSelectionContext'

const tierOptions = [['all', 'All seats'], ['tier3', 'Upper'], ['tier2', 'General'], ['tier1', 'Club'], ['premium', 'Premium']]
const priceOptions = [['all', 'Any price'], ['budget', 'Under ₹1,000'], ['mid', '₹1,000–₹2,500'], ['premium', '₹2,500+']]

function getStatus(index) {
  if (index % 173 === 0) return 'blocked'
  if (index % 131 === 0) return 'held'
  if (index % 71 === 0) return 'booked'
  return 'available'
}

function matchesPrice(seat, price) {
  if (price === 'budget') return seat.price < 1000
  if (price === 'mid') return seat.price >= 1000 && seat.price <= 2500
  if (price === 'premium') return seat.price > 2500
  return true
}

function SeatList({ seats, selectedIds, onToggle }) {
  const groups = useMemo(() => {
    const available = seats.filter((seat) => seat.status === 'available')
    return Object.values(available.reduce((all, seat) => {
      const key = `${seat.tier}|${seat.stand}|${seat.row}`
      ;(all[key] ||= { key, tier: seat.tier, stand: seat.stand, row: seat.row, seats: [] }).seats.push(seat)
      return all
    }, {})).slice(0, 10)
  }, [seats])
  if (!groups.length) return <div className="empty-card empty-card--seat"><strong>No seats match these filters</strong><p>Try another tier or price range to see available seats.</p></div>
  return <div className="seat-list-groups">{groups.map((group) => <section className="seat-list-group" key={group.key}><header><span className={`tier-dot tier-dot--${group.tier}`} /><div><strong>{TIER_META[group.tier].label} · {group.stand}</strong><small>Row {group.row} · ₹{group.seats[0].price.toLocaleString('en-IN')}</small></div></header><div>{group.seats.slice(0, 18).map((seat) => <button className={`seat-list__item ${selectedIds.has(seat.seatId) ? 'is-selected' : ''}`} key={seat.seatId} type="button" onClick={() => onToggle(seat)} aria-pressed={selectedIds.has(seat.seatId)}><span>{seat.seatId}</span><b>{selectedIds.has(seat.seatId) ? 'Selected' : 'Available'}</b></button>)}</div></section>)}</div>
}

function SelectionPanel({ selection, event, mobile = false }) {
  const { selectedSeats, seatCount, subtotal, convenienceFee, total, removeSeat, selectionMessage } = selection
  if (mobile) return <div className="mobile-selection-bar"><div><span>{seatCount ? `${seatCount} ${seatCount === 1 ? 'seat' : 'seats'} selected` : 'Choose your seats'}</span><strong>{seatCount ? `₹${total.toLocaleString('en-IN')}` : 'From ₹600'}</strong></div><a className={`button button--accent ${!seatCount ? 'is-disabled' : ''}`} href={seatCount ? '/booking-review' : undefined} aria-disabled={!seatCount}>Continue</a></div>
  return <aside className="selection-panel"><div className="selection-panel__title"><div><p className="eyebrow">Your selection</p><h2>{seatCount ? `${seatCount} ${seatCount === 1 ? 'seat' : 'seats'}` : 'No seats yet'}</h2></div>{seatCount ? <span className="selection-count">Held for 10:00</span> : null}</div><div className="selection-match"><span>{event.homeCode} <b>vs</b> {event.awayCode}</span><small>{event.venue} · {event.day} {event.month}</small></div>{selectionMessage ? <p className="selection-alert" role="alert">{selectionMessage}</p> : null}<div className="selected-seat-list">{selectedSeats.length ? selectedSeats.map((seat) => <div key={seat.seatId}><span><strong>{seat.seatId}</strong><small>{seat.tierLabel || TIER_META[seat.tier].label} · {seat.stand}</small></span><span><b>₹{seat.price.toLocaleString('en-IN')}</b><button aria-label={`Remove ${seat.seatId}`} onClick={() => removeSeat(seat.seatId)}>×</button></span></div>) : <div className="selection-empty"><span>◌</span><p>Choose available seats from the map or list to see them here.</p></div>}</div><div className="selection-pricing"><div><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><div><span>Convenience fee</span><strong>₹{convenienceFee.toLocaleString('en-IN')}</strong></div><div className="selection-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div></div><Button href={seatCount ? '/booking-review' : undefined} disabled={!seatCount}>Continue <span aria-hidden="true">→</span></Button><small className="selection-note">Seat availability is confirmed when you complete the booking.</small></aside>
}

export default function SeatSelection({ event }) {
  const stadium = useMemo(() => {
    const generated = generateStadium(STADIUM_CONFIG)
    const seats = generated.seats.map((seat, index) => ({ ...seat, status: getStatus(index) }))
    const byId = new Map(seats.map((seat) => [seat.seatId, seat]))
    return { ...generated, seats, tiers: generated.tiers.map((tier) => ({ ...tier, seats: tier.seats.map((seat) => byId.get(seat.seatId)) })) }
  }, [])
  const selection = useSeatSelection()
  const { selectedSeats, toggleSeat, beginSelection } = selection
  const [view, setView] = useState('map')
  const [tier, setTier] = useState('all')
  const [price, setPrice] = useState('all')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  useEffect(() => { beginSelection(event.id) }, [beginSelection, event.id])
  const selectedIds = useMemo(() => new Set(selectedSeats.map((seat) => seat.seatId)), [selectedSeats])
  const shownSeats = useMemo(() => stadium.seats.filter((seat) => (tier === 'all' || seat.tier === tier) && matchesPrice(seat, price) && (!availableOnly || seat.status === 'available' || selectedIds.has(seat.seatId))), [availableOnly, price, selectedIds, stadium.seats, tier])
  const visibleSeatIds = useMemo(() => new Set(shownSeats.map((seat) => seat.seatId)), [shownSeats])
  const availableCount = shownSeats.filter((seat) => seat.status === 'available').length
  const mapWidth = stadium.width / zoom
  const mapHeight = stadium.height / zoom
  const viewBox = `${Math.max(0, Math.min(stadium.width - mapWidth, (stadium.width - mapWidth) / 2 + pan.x))} ${Math.max(0, Math.min(stadium.height - mapHeight, (stadium.height - mapHeight) / 2 + pan.y))} ${mapWidth} ${mapHeight}`
  const resetMap = () => { setZoom(1); setPan({ x: 0, y: 0 }) }
  const handlePointerDown = (event) => {
    if (event.target.closest?.('.seat')) return
    dragRef.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const handlePointerMove = useCallback((event) => {
    if (!dragRef.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const scaleX = mapWidth / bounds.width
    const scaleY = mapHeight / bounds.height
    setPan((current) => ({ x: current.x - (event.clientX - dragRef.current.x) * scaleX, y: current.y - (event.clientY - dragRef.current.y) * scaleY }))
    dragRef.current = { x: event.clientX, y: event.clientY }
  }, [mapHeight, mapWidth])
  const handlePointerUp = () => { dragRef.current = null }
  const bestAvailable = () => {
    const additions = shownSeats.filter((seat) => seat.status === 'available' && !selectedIds.has(seat.seatId)).sort((a, b) => a.ring - b.ring || a.seatNumber - b.seatNumber).slice(0, Math.min(2, selection.maxSeats - selection.seatCount))
    additions.forEach(toggleSeat)
  }
  const resetFilters = () => { setTier('all'); setPrice('all'); setAvailableOnly(false) }

  return <main className="selection-page"><section className="container selection-header"><div><a className="back-link" href={`/events/${event.id}`}>← Back to match</a><p className="eyebrow">{event.category}</p><h1>{event.homeTeam} <span>vs</span> {event.awayTeam}</h1><p>{event.venue}, {event.city} <i>·</i> {event.day} {event.month} <i>·</i> {event.time}</p></div><div className="view-toggle" role="group" aria-label="Seat view"><button className={view === 'map' ? 'is-active' : ''} onClick={() => setView('map')}>Map</button><button className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')}>List</button></div></section><section className="container seat-filter-bar"><div className="filter-set"><span>Tier</span><div>{tierOptions.map(([value, label]) => <button className={tier === value ? 'is-active' : ''} onClick={() => setTier(value)} type="button" key={value}>{label}</button>)}</div></div><div className="filter-set filter-set--price"><span>Price</span><div>{priceOptions.map(([value, label]) => <button className={price === value ? 'is-active' : ''} onClick={() => setPrice(value)} type="button" key={value}>{label}</button>)}</div></div><label className="availability-filter"><input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} /> Available only</label><button type="button" className="best-available" onClick={bestAvailable}>✦ Best available</button></section><section className="container selection-layout"><section className="map-panel"><div className="map-panel__top"><div><p className="eyebrow">{view === 'map' ? 'Interactive stadium map' : 'Available seats by section'}</p><h2>{availableCount.toLocaleString('en-IN')} seats available</h2></div>{view === 'map' ? <div className="map-controls"><button aria-label="Zoom out" type="button" onClick={() => setZoom((current) => Math.max(1, Number((current - .2).toFixed(1))))}>−</button><span>{Math.round(zoom * 100)}%</span><button aria-label="Zoom in" type="button" onClick={() => setZoom((current) => Math.min(2, Number((current + .2).toFixed(1))))}>+</button><button className="map-reset" type="button" onClick={resetMap}>Reset</button></div> : null}</div>{view === 'map' ? <div className="selection-viewport"><StadiumSVG stadium={stadium} selectedSeats={selectedIds} visibleSeatIds={visibleSeatIds} viewBox={viewBox} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onToggle={(seatId) => toggleSeat(stadium.seats.find((seat) => seat.seatId === seatId))} /><p className="map-hint">Drag the map to pan · Use the controls to zoom</p></div> : <SeatList seats={shownSeats} selectedIds={selectedIds} onToggle={toggleSeat} />}<div className="stadium-legend" aria-label="Seat legend"><span><i className="legend-dot legend-dot--premium" />Premium</span><span><i className="legend-dot legend-dot--tier1" />Club</span><span><i className="legend-dot legend-dot--tier2" />General</span><span><i className="legend-dot legend-dot--tier3" />Upper</span><span><i className="legend-dot legend-dot--selected" />Selected</span><span><i className="legend-dot legend-dot--held" />Temporarily held</span><span><i className="legend-dot legend-dot--booked" />Unavailable</span></div>{(tier !== 'all' || price !== 'all' || availableOnly) ? <button className="reset-filters" type="button" onClick={resetFilters}>Clear seat filters</button> : null}</section><SelectionPanel selection={selection} event={event} /></section><SelectionPanel selection={selection} event={event} mobile /></main>
}
