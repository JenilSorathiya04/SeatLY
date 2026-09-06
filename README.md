# SeatLY

Initial MERN foundation for a cricket stadium seat allocation and booking platform.

## Architecture

React + Vite → REST API → Express → Controllers → Services → Mongoose → MongoDB

The current milestone intentionally contains **no authentication, booking, payment, admin, or real event-management logic**.

## Included

- React + Vite frontend
- Requested `src/` architecture
- Node.js + Express backend
- Requested `server/` architecture
- Environment configuration
- MongoDB/Mongoose connection module
- Centralized API response format
- Centralized error handling
- CORS configuration
- `GET /api/health`
- Mathematical SVG stadium foundation
- Minimal server health test

## Run

Install dependencies separately (no extra process-manager dependency is used):

```bash
npm install --prefix client
npm install --prefix server
```

Start the frontend:

```bash
npm run dev:client
```

Start the backend in another terminal:

```bash
npm run dev:server
```

Frontend: http://localhost:5173
Backend: http://localhost:5000
Health: http://localhost:5000/api/health

If `MONGODB_URI` is not configured, the initial API can still run for the health endpoint. Database-backed features will require MongoDB configuration in a later milestone.
