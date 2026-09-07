import { useState } from 'react'
import Button from '../components/common/Button'

const booking = { id: 'SLY-482091', day: '14', month: 'MAR', title: 'India vs Australia', venue: 'Wankhede Stadium', city: 'Mumbai', seats: 'P-R01-S042 · P-R01-S043', status: 'Confirmed' }

function BookingRow({ item }) {
  return <article className="booking-row"><div className="event-card__date"><strong>{item.day}</strong><span>{item.month}</span></div><div><p className="eyebrow">{item.status} · {item.id}</p><h2>{item.title}</h2><p className="muted">{item.venue} · {item.city} · {item.seats}</p></div><a className="text-link" href={`/booking/${item.id}`}>View details →</a></article>
}

export default function Dashboard({ bookings = false }) {
  const [tab, setTab] = useState('Upcoming')
  if (bookings) return <main className="page-shell"><section className="dashboard-heading container"><div><p className="eyebrow">Your SeatLY</p><h1>My bookings.</h1><p className="muted">Tickets and booking updates, all in one place.</p></div><Button href="/events">Browse matches <span aria-hidden="true">→</span></Button></section><section className="container"><div className="booking-tabs" role="tablist">{['Upcoming', 'Completed', 'Cancelled'].map((item) => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === 'Upcoming' ? <div className="booking-list"><BookingRow item={booking} /></div> : <div className="empty-card"><strong>No {tab.toLowerCase()} bookings yet</strong><p>When you have them, your tickets and updates will appear here.</p>{tab !== 'Cancelled' && <Button href="/events" variant="quiet">Explore matches</Button>}</div>}</section></main>
  return <main className="page-shell"><section className="dashboard-heading container"><div><p className="eyebrow">Your SeatLY</p><h1>Good evening, Aarav.</h1><p className="muted">Your next great view is waiting.</p></div><Button href="/events">Browse matches <span aria-hidden="true">→</span></Button></section><section className="container dashboard-grid"><article className="dashboard-feature"><p className="eyebrow eyebrow--light">Next up</p><h2>India vs Australia</h2><p>14 March · Wankhede Stadium · Mumbai</p><Button href="/events/india-australia">View match</Button></article><div className="dashboard-side"><div><span className="eyebrow">Upcoming booking</span><strong>1</strong><p>Confirmed ticket for 14 March</p></div><div><span className="eyebrow">Saved events</span><strong>3</strong><p>Ready when you are</p></div></div></section></main>
}
