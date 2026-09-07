// Mock data is deliberately shaped like the future API response.
// Components consume this service rather than embedding booking data locally.
export const EVENTS = [
  {
    id: 'india-australia', day: '14', month: 'MAR', date: '2026-03-14', category: 'International',
    title: 'India vs Australia', homeTeam: 'India', awayTeam: 'Australia', homeCode: 'IND', awayCode: 'AUS',
    venue: 'Wankhede Stadium', city: 'Mumbai', time: '7:30 PM', from: 600, availability: 'Filling fast', percentBooked: 82,
    description: 'A high-voltage evening under the lights at Wankhede Stadium.', gates: 'Gates open at 5:30 PM', imageTone: 'navy',
  },
  {
    id: 'mumbai-royals', day: '22', month: 'MAR', date: '2026-03-22', category: 'T20 League',
    title: 'Mumbai Royals vs Delhi Capitals', homeTeam: 'Mumbai Royals', awayTeam: 'Delhi Capitals', homeCode: 'MR', awayCode: 'DC',
    venue: 'Wankhede Stadium', city: 'Mumbai', time: '3:30 PM', from: 800, availability: 'Good availability', percentBooked: 47,
    description: 'A weekend T20 fixture with a full afternoon of cricket.', gates: 'Gates open at 1:30 PM', imageTone: 'blue',
  },
  {
    id: 'final-night', day: '05', month: 'APR', date: '2026-04-05', category: 'Championship',
    title: 'The Final: Titans vs Super Kings', homeTeam: 'Gujarat Titans', awayTeam: 'Chennai Super Kings', homeCode: 'GT', awayCode: 'CSK',
    venue: 'Narendra Modi Stadium', city: 'Ahmedabad', time: '7:30 PM', from: 1200, availability: 'Almost sold out', percentBooked: 91,
    description: 'The season finale at the world’s largest cricket stadium.', gates: 'Gates open at 5:00 PM', imageTone: 'gold',
  },
  {
    id: 'bengaluru-hyderabad', day: '12', month: 'APR', date: '2026-04-12', category: 'T20 League',
    title: 'Bengaluru Blazers vs Hyderabad Hawks', homeTeam: 'Bengaluru Blazers', awayTeam: 'Hyderabad Hawks', homeCode: 'BB', awayCode: 'HH',
    venue: 'M. Chinnaswamy Stadium', city: 'Bengaluru', time: '7:30 PM', from: 750, availability: 'Good availability', percentBooked: 39,
    description: 'A big rivalry in the heart of Bengaluru.', gates: 'Gates open at 5:30 PM', imageTone: 'coral',
  },
  {
    id: 'india-england', day: '19', month: 'APR', date: '2026-04-19', category: 'International',
    title: 'India vs England', homeTeam: 'India', awayTeam: 'England', homeCode: 'IND', awayCode: 'ENG',
    venue: 'Eden Gardens', city: 'Kolkata', time: '6:30 PM', from: 900, availability: 'Limited availability', percentBooked: 76,
    description: 'International cricket returns to Eden Gardens.', gates: 'Gates open at 4:30 PM', imageTone: 'green',
  },
]

export function getEvents() { return EVENTS }

export function getEvent(eventId) {
  return EVENTS.find((event) => event.id === eventId) || EVENTS[0]
}

export function getStadiums() {
  return [
    { name: 'Wankhede Stadium', city: 'Mumbai', capacity: '33,000', events: 2, tone: 'mumbai' },
    { name: 'Narendra Modi Stadium', city: 'Ahmedabad', capacity: '132,000', events: 1, tone: 'ahmedabad' },
    { name: 'Eden Gardens', city: 'Kolkata', capacity: '68,000', events: 1, tone: 'kolkata' },
  ]
}
