function SearchCard({ value, onChange, onSubmit, isLoading, error }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="glass-card-solid p-6 md:p-8 animate-fade-in-up animate-delay-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="waste-item" className="sr-only">
            Waste item
          </label>
          <input
            id="waste-item"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter waste item (Example: Plastic Bottle, Battery, Newspaper)"
            disabled={isLoading}
            className="w-full rounded-xl border border-gray-200 bg-white/90 px-5 py-4 text-gray-800
                       placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2
                       focus:ring-primary/30 transition-all duration-300 disabled:opacity-60"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 animate-fade-in" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing...
            </>
          ) : (
            <>
              <span>🔍</span>
              Analyze
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default SearchCard
