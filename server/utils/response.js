export function successResponse(data = {}, message = 'Operation successful') {
  return {
    success: true,
    data,
    message,
  }
}

export function errorResponse(code, message) {
  return {
    success: false,
    error: {
      code,
      message,
    },
  }
}
