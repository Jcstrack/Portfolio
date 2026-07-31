import { createServer } from 'node:http'
import { createRequestHandler } from './app.js'

const parsedPort = Number.parseInt(process.env.PORT || '3001', 10)
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3001
const host = process.env.HOST || '0.0.0.0'

const server = createServer(createRequestHandler())

server.listen(port, host, () => {
  console.log(`Portfolio API disponible en http://localhost:${port}/api/v1`)
})

server.on('error', (error) => {
  console.error('No fue posible iniciar Portfolio API:', error)
  process.exitCode = 1
})

const shutdown = (signal) => {
  console.log(`\n${signal} recibido. Cerrando Portfolio API...`)
  server.close(() => process.exit(0))
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
