const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/+$/, '')

export class PortfolioApiError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', cause } = {}) {
    super(message)
    this.name = 'PortfolioApiError'
    this.status = status
    this.code = code
    if (cause) this.cause = cause
  }
}

const requestJson = async (path, { signal } = {}) => {
  let response

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error

    throw new PortfolioApiError('No fue posible conectar con Portfolio API.', {
      code: 'NETWORK_ERROR',
      cause: error,
    })
  }

  let payload

  try {
    payload = await response.json()
  } catch (error) {
    throw new PortfolioApiError('Portfolio API entregó una respuesta inválida.', {
      status: response.status,
      code: 'INVALID_RESPONSE',
      cause: error,
    })
  }

  if (!response.ok) {
    throw new PortfolioApiError(
      payload?.error?.message || 'Portfolio API rechazó la solicitud.',
      {
        status: response.status,
        code: payload?.error?.code || 'REQUEST_FAILED',
      }
    )
  }

  return payload
}

export const fetchSkills = async ({ signal } = {}) => {
  const payload = await requestJson('/skills', { signal })

  if (!Array.isArray(payload.data)) {
    throw new PortfolioApiError('La lista de skills tiene un formato inválido.', {
      code: 'INVALID_SKILLS',
    })
  }

  return {
    skills: payload.data,
    meta: payload.meta || {},
  }
}
