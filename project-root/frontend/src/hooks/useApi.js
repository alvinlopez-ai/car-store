import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (apiFunc) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiFunc()
      setLoading(false)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      setError(errorMessage)
      setLoading(false)
      throw err
    }
  }

  return { loading, error, request }
}

export default useApi
