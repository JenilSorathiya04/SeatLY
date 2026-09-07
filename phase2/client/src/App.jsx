import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'
import { SeatSelectionProvider } from './contexts/SeatSelectionContext'

export default function App() {
  return (
    <SeatSelectionProvider>
      <Navbar />
      <AppRoutes />
    </SeatSelectionProvider>
  )
}
