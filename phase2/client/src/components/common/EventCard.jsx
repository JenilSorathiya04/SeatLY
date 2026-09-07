function TeamMark({ code, side }) {
  return <span className={`team-mark team-mark--${side}`} aria-hidden="true">{code}</span>
}

export default function EventCard({ event, compact = false }) {
  return (
    <article className={`event-card ${compact ? 'event-card--compact' : ''}`}>
      <div className="event-card__date"><strong>{event.day}</strong><span>{event.month}</span></div>
      <div className="event-card__body">
        <div className="event-card__topline"><span className="category-label">{event.category}</span><span className={`availability availability--${event.percentBooked > 75 ? 'urgent' : 'open'}`}>{event.availability}</span></div>
        <div className="event-card__matchup">
          <TeamMark code={event.homeCode} side="home" />
          <div><h3>{event.homeTeam} <em>vs</em> {event.awayTeam}</h3><p>{event.time} · {event.venue}, {event.city}</p></div>
          <TeamMark code={event.awayCode} side="away" />
        </div>
        <div className="event-card__footer"><span>From <strong>₹{event.from.toLocaleString('en-IN')}</strong></span><span className="availability-meter"><i style={{ width: `${event.percentBooked}%` }} />{event.percentBooked}% booked</span></div>
      </div>
      <a className="button button--quiet event-card__cta" href={`/events/${event.id}`}>View seats <span aria-hidden="true">→</span></a>
    </article>
  )
}
