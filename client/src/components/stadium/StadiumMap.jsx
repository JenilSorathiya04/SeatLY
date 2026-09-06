import StadiumSVG from './StadiumSVG'

export default function StadiumMap() {
  return (
    <section className="stadium-card" aria-labelledby="stadium-title">
      <div>
        <p className="eyebrow">Visual seat allocation</p>
        <h2 id="stadium-title">Stadium workspace</h2>
      </div>
      <StadiumSVG />
      <p className="muted">Seat geometry and event-specific seat data will be connected in a later milestone.</p>
    </section>
  )
}
