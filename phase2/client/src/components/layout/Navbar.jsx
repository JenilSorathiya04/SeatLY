import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="navbar">
      <div className="container navbar__content">
        <a className="brand" href="/" aria-label="SeatLY home">Seat<span>LY</span></a>
        <nav className={`nav-links ${open ? 'nav-links--open' : ''}`} aria-label="Main navigation">
          <a href="/" onClick={close}>Home</a><a href="/events" onClick={close}>Matches</a><a href="/bookings" onClick={close}>My bookings</a><a href="/profile" onClick={close}>Help</a>
          <a className="nav-account" href="/login" onClick={close}>Sign in</a>
        </nav>
        <div className="nav-utilities"><a className="nav-icon" href="/events" aria-label="Search matches">⌕</a><a className="nav-icon nav-icon--notify" href="/bookings" aria-label="Notifications">◌</a></div>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((current) => !current)}><i /><i /><i /></button>
      </div>
    </header>
  )
}
