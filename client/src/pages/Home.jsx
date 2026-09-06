import { useEffect, useState } from 'react'
import StadiumMap from '../components/stadium/StadiumMap'
import { getHealth } from '../services/api'

export default function Home() {
  const [health, setHealth] = useState({ status: 'checking', message: 'Checking API…' })

  useEffect(() => {
    let active = true

    getHealth()
      .then((payload) => {
        if (active) setHealth({ status: 'success', message: payload.message })
      })
      .catch(() => {
        if (active) setHealth({ status: 'error', message: 'API is unavailable. Start the backend server.' })
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="container hero__content">
          <p className="eyebrow">SeatLY · Cricket stadium experience</p>
          <h1>Choose your seat visually.</h1>
          <p className="hero__copy">
            The initial SeatLY foundation is ready. Stadium geometry is prepared for future
            event-specific seat data without introducing booking logic at this stage.
          </p>
        </div>
      </section>

      <section className="container foundation">
        <article className="health-card">
          <p className="eyebrow">System health</p>
          <h2>API foundation</h2>
          <p className={`status status--${health.status}`}>{health.message}</p>
          <p className="muted">Endpoint: GET /api/health</p>
        </article>
        <StadiumMap />
      </section>
    </main>
  )
}
