import test from 'node:test'
import assert from 'node:assert/strict'
import app from '../app.js'

function requestHealth() {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address()

      fetch(`http://127.0.0.1:${port}/api/health`)
        .then(async (response) => {
          const body = await response.json()
          server.close()
          resolve({ response, body })
        })
        .catch((error) => {
          server.close()
          reject(error)
        })
    })
  })
}

test('GET /api/health returns the standard success response', async () => {
  const { response, body } = await requestHealth()

  assert.equal(response.status, 200)
  assert.equal(body.success, true)
  assert.equal(body.data.service, 'seatly-api')
  assert.equal(body.data.status, 'ok')
  assert.equal(body.message, 'SeatLY API is healthy')
})
