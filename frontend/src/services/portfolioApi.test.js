import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchSkills, PortfolioApiError } from './portfolioApi'

const jsonResponse = (payload, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue(payload),
})

describe('Portfolio API client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('returns skills and metadata from a valid response', async () => {
    const skills = [
      {
        id: 'react',
        name: 'React.js',
        categories: ['frontend'],
        icon: 'FaReact',
      },
    ]

    fetch.mockResolvedValue(
      jsonResponse({ data: skills, meta: { total: skills.length } })
    )

    await expect(fetchSkills()).resolves.toEqual({
      skills,
      meta: { total: 1 },
    })
    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/skills',
      expect.objectContaining({
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
    )
  })

  it('normalizes connection failures', async () => {
    fetch.mockRejectedValue(new TypeError('Network unavailable'))

    await expect(fetchSkills()).rejects.toMatchObject({
      name: 'PortfolioApiError',
      code: 'NETWORK_ERROR',
      status: 0,
    })
  })

  it('rejects a malformed skill response', async () => {
    fetch.mockResolvedValue(jsonResponse({ data: { id: 'react' } }))

    await expect(fetchSkills()).rejects.toMatchObject({
      code: 'INVALID_SKILLS',
    })
  })

  it('preserves API error information', async () => {
    fetch.mockResolvedValue(
      jsonResponse(
        {
          error: {
            code: 'INVALID_CATEGORY',
            message: 'Categoría no válida.',
          },
        },
        { ok: false, status: 400 }
      )
    )

    await expect(fetchSkills()).rejects.toEqual(
      expect.objectContaining({
        message: 'Categoría no válida.',
        code: 'INVALID_CATEGORY',
        status: 400,
      })
    )
    await expect(fetchSkills()).rejects.toBeInstanceOf(PortfolioApiError)
  })
})
