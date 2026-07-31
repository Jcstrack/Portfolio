import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { after, before, test } from 'node:test'
import { createRequestHandler } from '../src/app.js'

let server
let baseUrl

before(async () => {
  server = createServer(
    createRequestHandler({
      allowedOrigins: ['http://localhost:5173'],
    })
  )

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  baseUrl = `http://127.0.0.1:${address.port}`
})

after(async () => {
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  )
})

test('expone el estado de salud', async () => {
  const response = await fetch(`${baseUrl}/api/v1/health`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.data.status, 'ok')
})

test('entrega exactamente las 47 skills', async () => {
  const response = await fetch(`${baseUrl}/api/v1/skills`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.data.length, 47)
  assert.equal(body.meta.total, 47)
  assert.equal(body.meta.count, 47)
})

test('filtra skills por categoría', async () => {
  const response = await fetch(`${baseUrl}/api/v1/skills?category=cloud`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.ok(body.data.length > 0)
  assert.ok(body.data.every((skill) => skill.categories.includes('cloud')))
})

test('busca skills por texto sin distinguir mayúsculas', async () => {
  const response = await fetch(`${baseUrl}/api/v1/skills?q=REACT`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(
    body.data.map((skill) => skill.id),
    ['react-js']
  )
})

test('entrega contenido localizado', async () => {
  const response = await fetch(`${baseUrl}/api/v1/content/about?lang=en`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.meta.language, 'en')
  assert.equal(body.data.title, 'About me')
})

test('responde con 400 para una categoría inexistente', async () => {
  const response = await fetch(
    `${baseUrl}/api/v1/skills?category=does-not-exist`
  )
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.equal(body.error.code, 'INVALID_CATEGORY')
})

test('habilita CORS únicamente para un origen autorizado', async () => {
  const allowedResponse = await fetch(`${baseUrl}/api/v1/skills`, {
    headers: { Origin: 'http://localhost:5173' },
  })
  const blockedResponse = await fetch(`${baseUrl}/api/v1/skills`, {
    headers: { Origin: 'https://example.com' },
  })

  assert.equal(
    allowedResponse.headers.get('access-control-allow-origin'),
    'http://localhost:5173'
  )
  assert.equal(blockedResponse.headers.get('access-control-allow-origin'), null)
})
