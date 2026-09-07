import { errorResponse } from '../utils/response.js'

export function notFoundHandler(req, res) {
  res.status(404).json(
    errorResponse('ROUTE_NOT_FOUND', `Route not found: ${req.method} ${req.originalUrl}`),
  )
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (err instanceof SyntaxError && 'body' in err ? 400 : 500)
  const code = err.code || (statusCode === 400 ? 'INVALID_REQUEST' : 'INTERNAL_SERVER_ERROR')
  const message = statusCode >= 500 ? 'Internal server error' : err.message

  if (statusCode >= 500) console.error(err)

  res.status(statusCode).json(errorResponse(code, message))
}
