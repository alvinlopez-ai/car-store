import React from 'react'

export const Loading = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
)

export const ErrorMessage = ({ message, onDismiss }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
    <span>{message}</span>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-red-700 hover:text-red-900 font-bold"
      >
        ✕
      </button>
    )}
  </div>
)

export default { Loading, ErrorMessage }
