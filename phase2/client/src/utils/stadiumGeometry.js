const DEG_TO_RAD = Math.PI / 180

export const STADIUM_CONFIG = Object.freeze({
  width: 1200,
  height: 760,
  centerX: 600,
  centerY: 380,
  pitch: { width: 230, height: 150 },
  angularGaps: [0, 90, 180, 270],
  gapWidth: 14,
  tiers: [
    { key: 'premium', label: 'Premium', rings: 3, startRadius: 0.39, ringStep: 0.055, baseSeats: 100 },
    { key: 'tier1', label: 'Tier 1', rings: 4, startRadius: 0.56, ringStep: 0.055, baseSeats: 100 },
    { key: 'tier2', label: 'Tier 2', rings: 4, startRadius: 0.76, ringStep: 0.045, baseSeats: 100 },
    { key: 'tier3', label: 'Tier 3', rings: 4, startRadius: 0.91, ringStep: 0.025, baseSeats: 100 },
  ],
})

export const TIER_PRICES = Object.freeze({ premium: 5000, tier1: 2500, tier2: 1200, tier3: 600 })

export const TIER_META = Object.freeze({
  premium: { label: 'Premium', stand: 'Pavilion', color: '#eb9b32' },
  tier1: { label: 'Club', stand: 'North Stand', color: '#6674df' },
  tier2: { label: 'General', stand: 'East Stand', color: '#309b93' },
  tier3: { label: 'Upper', stand: 'West Stand', color: '#8792a5' },
})

export function calculateAngularGap(config = STADIUM_CONFIG) {
  const gapWidth = Number(config.gapWidth ?? STADIUM_CONFIG.gapWidth)
  const gaps = config.angularGaps ?? STADIUM_CONFIG.angularGaps
  return { gapWidth, gaps: [...gaps], totalGapDegrees: gapWidth * gaps.length }
}

export function isInAngularGap(angle, config = STADIUM_CONFIG) {
  const normalized = ((angle % 360) + 360) % 360
  const { gaps, gapWidth } = calculateAngularGap(config)
  return gaps.some((gapCenter) => {
    const distance = Math.abs(((normalized - gapCenter + 180) % 360) - 180)
    return distance < gapWidth / 2
  })
}

export function calculateSeatCount(ringIndex, tierConfig, config = STADIUM_CONFIG) {
  const { totalGapDegrees } = calculateAngularGap(config)
  const availableFraction = (360 - totalGapDegrees) / 360
  const count = tierConfig.baseSeats + ringIndex * 18
  return Math.max(1, Math.round(count * availableFraction))
}

export function calculateSeatPosition({ centerX, centerY, radiusX, radiusY, r, theta }) {
  return {
    x: centerX + radiusX * r * Math.cos(theta * DEG_TO_RAD),
    y: centerY + radiusY * r * Math.sin(theta * DEG_TO_RAD),
  }
}

export function generateSeatId(tier, ring, seatNumber) {
  const tierCode = tier === 'premium' ? 'P' : tier.replace('tier', 'T')
  return `${tierCode}-R${String(ring).padStart(2, '0')}-S${String(seatNumber).padStart(3, '0')}`
}

function buildSeatAngles(count, config) {
  const { gaps, gapWidth } = calculateAngularGap(config)
  const halfGap = gapWidth / 2
  const sortedCenters = [...gaps].map((angle) => ((angle % 360) + 360) % 360).sort((a, b) => a - b)
  const usableIntervals = []

  for (let index = 0; index < sortedCenters.length; index += 1) {
    const current = sortedCenters[index]
    const previous = sortedCenters[(index - 1 + sortedCenters.length) % sortedCenters.length]
    const start = previous + halfGap
    const end = current - halfGap + (current <= previous ? 360 : 0)
    usableIntervals.push([start, end])
  }

  const totalDegrees = usableIntervals.reduce((sum, [start, end]) => sum + end - start, 0)
  const rawCounts = usableIntervals.map(([start, end]) => (end - start) / totalDegrees * count)
  const intervalCounts = rawCounts.map((value) => Math.max(1, Math.floor(value)))
  let remaining = count - intervalCounts.reduce((sum, value) => sum + value, 0)

  while (remaining > 0) {
    const index = intervalCounts
      .map((value, i) => ({ i, remainder: rawCounts[i] - Math.floor(rawCounts[i]) }))
      .sort((a, b) => b.remainder - a.remainder)[0].i
    intervalCounts[index] += 1
    remaining -= 1
  }

  const angles = []
  usableIntervals.forEach(([start, end], intervalIndex) => {
    const intervalCount = intervalCounts[intervalIndex]
    for (let i = 0; i < intervalCount; i += 1) {
      angles.push(start + ((i + 0.5) / intervalCount) * (end - start))
    }
  })

  return angles.map((angle) => ((angle % 360) + 360) % 360).sort((a, b) => a - b)
}

export function generateRing({ tier, tierConfig, ringIndex, globalRingIndex, config = STADIUM_CONFIG }) {
  const r = tierConfig.startRadius + ringIndex * tierConfig.ringStep
  const radiusX = config.width * 0.46
  const radiusY = config.height * 0.40
  const seatCount = calculateSeatCount(globalRingIndex, tierConfig, config)
  const angles = buildSeatAngles(seatCount, config)

  return angles.map((angle, index) => {
    const position = calculateSeatPosition({
      centerX: config.centerX,
      centerY: config.centerY,
      radiusX,
      radiusY,
      r,
      theta: angle,
    })

    return {
      seatId: generateSeatId(tier, globalRingIndex + 1, index + 1),
      tier,
      tierLabel: TIER_META[tier].label,
      ring: globalRingIndex + 1,
      row: String.fromCharCode(65 + (globalRingIndex % 26)),
      stand: angle >= 315 || angle < 45 ? 'East Stand' : angle < 135 ? 'South Stand' : angle < 225 ? 'West Stand' : 'North Stand',
      seatNumber: index + 1,
      angle: Number(angle.toFixed(2)),
      x: Number(position.x.toFixed(2)),
      y: Number(position.y.toFixed(2)),
      price: TIER_PRICES[tier],
      status: 'available',
    }
  })
}

export function generateTier({ tierConfig, tier, ringOffset = 0, config = STADIUM_CONFIG }) {
  return Array.from({ length: tierConfig.rings }, (_, ringIndex) => generateRing({
    tier,
    tierConfig,
    ringIndex,
    globalRingIndex: ringOffset + ringIndex,
    config,
  })).flat()
}

export function generateStadium(config = STADIUM_CONFIG) {
  let ringOffset = 0
  const tiers = config.tiers.map((tierConfig) => {
    const seats = generateTier({ tier: tierConfig.key, tierConfig, ringOffset, config })
    ringOffset += tierConfig.rings
    return { ...tierConfig, seats }
  })

  return {
    width: config.width,
    height: config.height,
    centerX: config.centerX,
    centerY: config.centerY,
    tiers,
    seats: tiers.flatMap((tier) => tier.seats),
    rings: ringOffset,
    angularGaps: calculateAngularGap(config),
  }
}
