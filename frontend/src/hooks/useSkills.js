import { useCallback, useEffect, useState } from 'react'
import { fetchSkills } from '../services/portfolioApi'

export const useSkills = () => {
  const [skills, setSkills] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    setRequestVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const loadSkills = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchSkills({ signal: controller.signal })
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
