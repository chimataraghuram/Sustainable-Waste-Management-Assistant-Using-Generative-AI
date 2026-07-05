function HistoryCard({ item, category, recyclable, timestamp }) {
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown date'

  const isRecyclable =
    recyclable?.toLowerCase() === 'yes' || recyclable?.toLowerCase() === 'true'

  return (
    <div
      className="glass-card-solid p-5 transition-all duration-300 hover:scale-[1.02]
                 hover:shadow-xl hover:border-primary/30 cursor-default group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary transition-colors">
            {item}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isRecyclable
              ? 'bg-primary/15 text-primary-dark'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isRecyclable ? 'Recyclable' : 'Not Recyclable'}
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-400">{formattedDate}</p>
    </div>
  )
}

export default HistoryCard
