import { useMemo, useState } from 'react'
import EventCard from '../components/common/EventCard'
import { getEvents } from '../services/eventService'

const initialFilters = { search: '', city: 'All cities', competition: 'All competitions', price: 'Any price' }

export default function Events() {
  const [filters, setFilters] = useState(initialFilters)
  const [sort, setSort] = useState('soonest')
  const events = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const filtered = getEvents().filter((event) => {
      const text = `${event.title} ${event.venue} ${event.city} ${event.category}`.toLowerCase()
      const cityMatch = filters.city === 'All cities' || event.city === filters.city
      const competitionMatch = filters.competition === 'All competitions' || event.category === filters.competition
      const priceMatch = filters.price === 'Any price' || (filters.price === 'Under ₹800' ? event.from < 800 : event.from >= 800)
      return (!search || text.includes(search)) && cityMatch && competitionMatch && priceMatch
    })
    return filtered.sort((a, b) => sort === 'price-low' ? a.from - b.from : sort === 'price-high' ? b.from - a.from : sort === 'popular' ? b.percentBooked - a.percentBooked : a.date.localeCompare(b.date))
  }, [filters, sort])
  const update = (name, value) => setFilters((current) => ({ ...current, [name]: value }))
  return <main className="page-shell matches-page"><section className="container matches-hero"><p className="eyebrow">Find your next view</p><h1>Upcoming matches.</h1><p>Explore the fixtures you care about, then choose exactly where you want to be when it happens.</p><div className="matches-search"><span aria-hidden="true">⌕</span><input value={filters.search} onChange={(event) => update('search', event.target.value)} aria-label="Search matches" placeholder="Search teams, stadiums or cities" /></div></section><section className="container mobile-filter-row"><button type="button" className="filter-chip">Filters</button><button type="button" className="filter-chip">Date: Any</button><button type="button" className="filter-chip">City: All</button></section><section className="container event-layout"><aside className="filter-panel"><div><p className="eyebrow">Refine your search</p><h2>Filters</h2></div><label>City<select value={filters.city} onChange={(event) => update('city', event.target.value)}><option>All cities</option><option>Mumbai</option><option>Ahmedabad</option><option>Bengaluru</option><option>Kolkata</option></select></label><label>Competition<select value={filters.competition} onChange={(event) => update('competition', event.target.value)}><option>All competitions</option><option>International</option><option>T20 League</option><option>Championship</option></select></label><label>Starting price<select value={filters.price} onChange={(event) => update('price', event.target.value)}><option>Any price</option><option>Under ₹800</option><option>₹800 and above</option></select></label><button className="filter-clear" type="button" onClick={() => setFilters(initialFilters)}>Clear all filters</button></aside><div className="event-results"><div className="results-toolbar"><span><strong>{events.length}</strong> {events.length === 1 ? 'match' : 'matches'} available</span><label>Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="soonest">Soonest</option><option value="popular">Most popular</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>{events.length ? <div className="event-list">{events.map((event) => <EventCard key={event.id} event={event} />)}</div> : <div className="empty-card"><strong>No matches found</strong><p>Try clearing a filter or searching another city.</p><button className="button button--quiet" type="button" onClick={() => setFilters(initialFilters)}>Reset search</button></div>}</div></section></main>
}
