const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`, {
    headers: { Accept: 'application/json' },
  })

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error('API returned an invalid JSON response')
  }

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'API request failed')
  }

  return payload
}
