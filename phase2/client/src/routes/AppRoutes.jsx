import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from '../pages/Home'
import Events from '../pages/Events'
import EventDetails from '../pages/EventDetails'
import SeatSelection from '../pages/SeatSelection'
import Auth from '../pages/Auth'
import Dashboard from '../pages/Dashboard'
import BookingDetails from '../pages/BookingDetails'
import BookingReview from '../pages/BookingReview'
import BookingSuccess from '../pages/BookingSuccess'
import Profile from '../pages/Profile'
import { getEvent } from '../services/eventService'

function EventRoute() { const { eventId } = useParams(); return <EventDetails event={getEvent(eventId)} /> }
function SeatRoute() { const { eventId } = useParams(); return <SeatSelection event={getEvent(eventId)} /> }

export default function AppRoutes() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home />} /><Route path="/events" element={<Events />} />
    <Route path="/events/:eventId" element={<EventRoute />} /><Route path="/events/:eventId/seats" element={<SeatRoute />} />
    <Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth mode="register" />} /><Route path="/forgot-password" element={<Auth mode="forgot" />} />
    <Route path="/dashboard" element={<Dashboard />} /><Route path="/bookings" element={<Dashboard bookings />} />
    <Route path="/booking-review" element={<BookingReview />} /><Route path="/booking-success" element={<BookingSuccess />} />
    <Route path="/booking/:bookingId" element={<BookingDetails />} /><Route path="/profile" element={<Profile />} /><Route path="*" element={<Home />} />
  </Routes></BrowserRouter>
}
