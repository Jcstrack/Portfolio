import { getLocalizedContent, getSkills } from './data-store.js'

const API_PREFIX = '/api/v1'
const defaultOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']

const normalizeText = (value) =>
  value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es')

const parseOrigins = (value) => {
  if (!value) return defaultOrigins

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

const setCorsHeaders = (request, response, allowedOrigins) => {
  const origin = request.headers.origin
  const allowsEveryOrigin = allowedOrigins.includes('*')
  const isAllowedOrigin = origin && (allowsEveryOrigin || allowedOrigins.includes(origin))

  if (isAllowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowsEveryOrigin ? '*' : origin)
    response.setHeader('Vary', 'Origin')
  }

  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const sendJson = (request, response, statusCode, payload, cacheControl = 'no-store') => {
  const body = JSON.stringify(payload)

  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': cacheControl,
    'X-Content-Type-Options': 'nosniff',
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  response.end(body)
}

const routeNotFound = (request, response) =>
  sendJson(request, response, 404, {
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'La ruta solicitada no existe.',
    },
  })

const getLanguage = (url) => url.searchParams.get('lang')?.toLowerCase() || 'es'

const getApiIndex = () => ({
  name: 'Portfolio API',
  version: '1.0.0',
  endpoints: {
    health: `${API_PREFIX}/health`,
    profile: `${API_PREFIX}/profile?lang=es`,
    content: `${API_PREFIX}/content?lang=es`,
    contentSection: `${API_PREFIX}/content/about?lang=es`,
    categories: `${API_PREFIX}/categories?lang=es`,
    skills: `${API_PREFIX}/skills`,
    filteredSkills: `${API_PREFIX}/skills?category=frontend&q=react`,
    skill: `${API_PREFIX}/skills/react-js`,
  },
})

export const createRequestHandler = ({
  allowedOrigins = parseOrigins(process.env.ALLOWED_ORIGINS),
} = {}) => {
  return (request, response) => {
    setCorsHeaders(request, response, allowedOrigins)

    if (request.method === 'OPTIONS') {
      response.writeHead(204)
      response.end()
      return
    }

    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD, OPTIONS')
      sendJson(request, response, 405, {
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: 'Este recurso solo admite consultas de lectura.',
        },
      })
      return
    }

    try {
      const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`)
      const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : '/'

      if (path === '/' || path === API_PREFIX) {
        sendJson(request, response, 200, { data: getApiIndex() }, 'public, max-age=300')
        return
      }

      if (path === `${API_PREFIX}/health`) {
        sendJson(request, response, 200, {
          data: {
            status: 'ok',
            service: 'portfolio-api',
            timestamp: new Date().toISOString(),
          },
        })
        return
      }

      if (path === `${API_PREFIX}/profile`) {
        const { language, content, supportedLanguages } = getLocalizedContent(
          getLanguage(url)
        )

        sendJson(
          request,
          response,
          200,
          {
            data: content.profile,
            meta: { language, supportedLanguages },
          },
          'public, max-age=60'
        )
        return
      }

      if (path === `${API_PREFIX}/content`) {
        const { language, content, supportedLanguages } = getLocalizedContent(
          getLanguage(url)
        )

        sendJson(
          request,
          response,
          200,
          {
            data: content.sections,
            meta: { language, supportedLanguages },
          },
          'public, max-age=60'
        )
        return
      }

      if (path.startsWith(`${API_PREFIX}/content/`)) {
        const section = decodeURIComponent(path.slice(`${API_PREFIX}/content/`.length))
        const { language, content, supportedLanguages } = getLocalizedContent(
          getLanguage(url)
        )
        const sectionContent = content.sections[section]

        if (!sectionContent) {
          sendJson(request, response, 404, {
            error: {
              code: 'CONTENT_NOT_FOUND',
              message: `No existe la sección "${section}".`,
            },
          })
          return
        }

        sendJson(
          request,
          response,
          200,
          {
            data: sectionContent,
            meta: { section, language, supportedLanguages },
          },
          'public, max-age=60'
        )
        return
      }

      if (path === `${API_PREFIX}/categories`) {
        const { language, content, supportedLanguages } = getLocalizedContent(
          getLanguage(url)
        )

        sendJson(
          request,
          response,
          200,
          {
            data: content.categories,
            meta: { language, supportedLanguages },
          },
          'public, max-age=300'
        )
        return
      }

      if (path === `${API_PREFIX}/skills`) {
        const skills = getSkills()
        const category = url.searchParams.get('category')?.toLowerCase().trim()
        const query = url.searchParams.get('q')?.trim()
        const availableCategories = [
          ...new Set(skills.flatMap((skill) => skill.categories)),
        ]

        if (category && category !== 'all' && !availableCategories.includes(category)) {
          sendJson(request, response, 400, {
            error: {
              code: 'INVALID_CATEGORY',
              message: `La categoría "${category}" no existe.`,
              details: { availableCategories },
            },
          })
          return
        }

        const normalizedQuery = query ? normalizeText(query.slice(0, 100)) : ''
        const filteredSkills = skills.filter((skill) => {
          const matchesCategory =
            !category || category === 'all' || skill.categories.includes(category)
          const matchesQuery =
            !normalizedQuery || normalizeText(skill.name).includes(normalizedQuery)

          return matchesCategory && matchesQuery
        })

        sendJson(
          request,
          response,
          200,
          {
            data: filteredSkills,
            meta: {
              total: skills.length,
              count: filteredSkills.length,
              filters: {
                category: category || 'all',
                query: query || '',
              },
              availableCategories,
            },
          },
          'public, max-age=60'
        )
        return
      }

      if (path.startsWith(`${API_PREFIX}/skills/`)) {
        const skillId = decodeURIComponent(path.slice(`${API_PREFIX}/skills/`.length))
        const skill = getSkills().find((item) => item.id === skillId)

        if (!skill) {
          sendJson(request, response, 404, {
            error: {
              code: 'SKILL_NOT_FOUND',
              message: `No existe la skill "${skillId}".`,
            },
          })
          return
        }

        sendJson(request, response, 200, { data: skill }, 'public, max-age=300')
        return
      }

      routeNotFound(request, response)
    } catch (error) {
      console.error('Portfolio API request failed:', error)
      sendJson(request, response, 500, {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'No fue posible procesar la solicitud.',
        },
      })
    }
  }
}
