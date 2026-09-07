import EventCard from '../components/common/EventCard'
import StadiumMap from '../components/stadium/StadiumMap'
import { getEvents, getStadiums } from '../services/eventService'

const steps = [
  ['01', 'Discover the match', 'Search by city, team, venue or competition.'],
  ['02', 'Choose your view', 'Explore each tier on a true-to-venue stadium map.'],
  ['03', 'Book with confidence', 'See every fee before confirming your seats.'],
]

export default function Home() {
  const trending = getEvents().slice(0, 3)
  return (
    <main>
      <section className="hero">
        <div className="hero__glow hero__glow--one" /><div className="hero__glow hero__glow--two" />
        <div className="container hero__layout">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">Cricket tickets, made clearer</p>
            <h1>Find your seat.<br /><em>Feel the match.</em></h1>
            <p className="hero__copy">From the first ball to the final roar, SeatLY helps you find the view that makes match day yours.</p>
            <div className="hero__actions"><a className="button button--accent" href="/events">Explore matches <span aria-hidden="true">→</span></a><a className="button button--ghost" href="#stadiums">View stadiums</a></div>
          </div>
          <div className="hero-scorecard" aria-label="Featured match India versus Australia">
            <div className="hero-scorecard__top"><span>FEATURED MATCH</span><span>14 MAR · 7:30 PM</span></div>
            <div className="hero-scorecard__teams"><div><strong>IND</strong><span>India</span></div><b>VS</b><div><strong>AUS</strong><span>Australia</span></div></div>
            <p>Wankhede Stadium · Mumbai</p><a href="/events/india-australia">View match details →</a>
          </div>
          <form className="match-search" action="/events">
            <label><span>FROM</span><input name="location" placeholder="City or stadium" /></label>
            <label><span>MATCH</span><input name="match" placeholder="Team vs team" /></label>
            <label><span>DATE</span><select name="date" defaultValue=""><option value="">Any date</option><option>This week</option><option>This month</option></select></label>
            <label className="match-search__category"><span>CATEGORY</span><select name="category" defaultValue=""><option value="">All cricket</option><option>International</option><option>T20 League</option></select></label>
            <button className="button button--accent" type="submit">Search matches <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </section>

      <section className="container content-section">
        <div className="section-heading"><div><p className="eyebrow">Most in demand</p><h2>Trending matches</h2></div><a className="text-link" href="/events">See all matches <span aria-hidden="true">→</span></a></div>
        <div className="event-list event-list--home">{trending.map((event) => <EventCard key={event.id} event={event} compact />)}</div>
      </section>

      <section id="stadiums" className="stadiums-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Explore by venue</p><h2>Every seat starts with a stadium.</h2></div><p className="section-heading__copy">See a familiar ground in a whole new way — including the exact tiers and prices available for your match.</p></div><div className="stadium-grid">{getStadiums().map((stadium) => <a href="/events" className={`venue-card venue-card--${stadium.tone}`} key={stadium.name}><div className="venue-card__illustration"><span className="venue-card__field" /></div><div><p>{stadium.city}</p><h3>{stadium.name}</h3><span>{stadium.capacity} capacity · {stadium.events} upcoming {stadium.events === 1 ? 'match' : 'matches'}</span></div><b aria-hidden="true">→</b></a>)}</div></div></section>

      <section className="container map-showcase"><div className="map-showcase__copy"><p className="eyebrow">Made for the match day moment</p><h2>Know the view before you commit.</h2><p>SeatLY’s stadium map turns a complex bowl into simple decisions. Compare categories, spot availability, and keep your group together.</p><ul><li><i>✓</i> Live seat-status indicators</li><li><i>✓</i> Transparent prices by tier</li><li><i>✓</i> One shared booking selection</li></ul><a className="button button--primary" href="/events/india-australia/seats">Try the seat map <span aria-hidden="true">→</span></a></div><StadiumMap /></section>

      <section className="how-section"><div className="container"><div className="section-heading"><div><p className="eyebrow eyebrow--light">Simple by design</p><h2>From fixture to finish line.</h2></div></div><div className="steps-grid">{steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="container confidence-row"><div><strong>Secure booking</strong><span>Payments and bookings are verified before confirmation.</span></div><div><strong>Clear pricing</strong><span>No surprise charges at the final step.</span></div><div><strong>Built for fans</strong><span>Find the right view, not just an empty seat.</span></div></section>
    </main>
  )
}
