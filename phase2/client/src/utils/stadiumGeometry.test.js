import { generateStadium, calculateAngularGap, isInAngularGap } from './stadiumGeometry.js'

const stadium = generateStadium()
const ids = new Set(stadium.seats.map((seat) => seat.seatId))
const positions = new Set(stadium.seats.map((seat) => `${seat.x}:${seat.y}`))

if (stadium.seats.length < 2500 || stadium.seats.length > 3000) throw new Error(`Seat count out of range: ${stadium.seats.length}`)
if (ids.size !== stadium.seats.length) throw new Error('Duplicate seat IDs detected')
if (positions.size !== stadium.seats.length) throw new Error('Duplicate seat positions detected')
if (stadium.tiers.length !== 4) throw new Error('Expected four tiers')
if (stadium.rings !== 15) throw new Error(`Expected 15 rings, got ${stadium.rings}`)
if (stadium.tiers.some((tier) => tier.seats.length === 0)) throw new Error('Empty tier detected')
if (!isInAngularGap(0) || !isInAngularGap(90) || !isInAngularGap(180) || !isInAngularGap(270)) throw new Error('Angular gaps are not represented')
if (calculateAngularGap().totalGapDegrees !== 56) throw new Error('Unexpected angular gap configuration')
console.log(JSON.stringify({ totalSeats: stadium.seats.length, tiers: Object.fromEntries(stadium.tiers.map((tier) => [tier.label, tier.seats.length])), rings: stadium.rings, uniqueSeatIds: ids.size, uniquePositions: positions.size }, null, 2))
