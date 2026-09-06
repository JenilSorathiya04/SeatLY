import { successResponse } from '../utils/response.js'

export function getHealth(req, res) {
  res.status(200).json(
    successResponse(
      {
        service: 'seatly-api',
        status: 'ok',
      },
      'SeatLY API is healthy',
    ),
  )
}
