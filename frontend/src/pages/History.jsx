import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryCard from '../components/HistoryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchHistory } from '../services/historyService'
import { isFirebaseConfigured } from '../firebase/config'

function History() {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadHistory() {
      if (!isFirebaseConfigured) {
        setError('Firebase is not configured. Add your credentials to frontend/.env')
        setIsLoading(false)
        return
      }

      try {
        const data = await fetchHistory()
        setRecords(data)
      } catch {
        setError('Unable to load history. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Analysis{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            History
          </span>
        </h1>
        <p className="text-gray-600">Your past waste item analyses, newest first.</p>
      </div>

      {isLoading && (
        <div className="glass-card-solid p-8">
          <LoadingSpinner message="Loading history..." />
        </div>
      )}

      {error && !isLoading && (
        <div className="glass-card-solid p-8 text-center">
          <span className="text-4xl mb-3 block">⚠️</span>
          <p className="text-red-500 mb-4">{error}</p>
          <Link to="/" className="btn-primary inline-block">
            Analyze an Item
          </Link>
        </div>
      )}

      {!isLoading && !error && records.length === 0 && (
        <div className="glass-card-solid p-12 text-center">
          <span className="text-6xl mb-4 block">📭</span>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No History Yet</h2>
          <p className="text-gray-500 mb-6">
            Analyze your first waste item to start building history.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Analyze an Item
          </Link>
        </div>
      )}

      {!isLoading && !error && records.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {records.map((record, index) => (
            <div
              key={record.id}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${Math.min(index * 80, 400)}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <HistoryCard
                item={record.item}
                category={record.category}
                recyclable={record.recyclable}
                timestamp={record.timestamp}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
