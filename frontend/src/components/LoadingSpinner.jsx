function LoadingSpinner({ message = 'Analyzing waste item...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fade-in">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <p className="text-lg font-medium text-gray-600">{message}</p>
      <p className="text-sm text-gray-400">Powered by Gemini AI</p>
    </div>
  )
}

export default LoadingSpinner
