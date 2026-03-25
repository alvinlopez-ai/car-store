import React from 'react'

export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const handleError = () => {
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-900 mb-2">Something went wrong</h1>
          <p className="text-red-700 mb-4">Please refresh the page or try again later.</p>
          <button
            onClick={() => {
              setHasError(false)
              window.location.reload()
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return children
}

export default ErrorBoundary
