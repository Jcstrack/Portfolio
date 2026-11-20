import { useCallback, useEffect, useState } from 'react'
import { fetchSkills } from '../services/portfolioApi'

const CACHE_TTL = 5 * 60 * 1000
let skillsCache = null

const getSkillsCache = () => {
  if (!skillsCache || skillsCache.expiresAt <= Date.now()) {
    skillsCache = null
    return null
  }

  return skillsCache.value
}

export const useSkills = () => {
  const cachedOnMount = getSkillsCache()
  const [skills, setSkills] = useState(() => cachedOnMount?.skills || [])
  const [meta, setMeta] = useState(() => cachedOnMount?.meta || {})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(() => !cachedOnMount)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    skillsCache = null
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const cached = requestVersion === 0 ? getSkillsCache() : null

    if (cached) {
      setSkills(cached.skills)
      setMeta(cached.meta)
      setError(null)
      setIsLoading(false)
      return undefined
    }

    const controller = new AbortController()

    const loadSkills = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchSkills({ signal: controller.signal })
        skillsCache = {
          value: result,
          expiresAt: Date.now() + CACHE_TTL,
        }
        setSkills(result.skills)
        setMeta(result.meta)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setSkills([])
          setMeta({})
          setError(requestError)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadSkills()

    return () => controller.abort()
  }, [requestVersion])

  return {
    skills,
    meta,
    error,
    isLoading,
    retry,
  }
}
