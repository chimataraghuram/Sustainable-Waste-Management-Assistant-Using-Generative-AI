import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchCard from '../components/SearchCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeWasteItem } from '../services/api'
import { saveToHistory } from '../services/historyService'

function Home() {
  const [item, setItem] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState('')
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    const trimmed = item.trim()

    if (!trimmed) {
      setValidationError('Please enter a waste item to analyze.')
      return
    }

    setValidationError('')
    setIsLoading(true)

    try {
      const result = await analyzeWasteItem(trimmed)

      // Save to Firebase history (non-blocking)
      saveToHistory({
        item: result.item || trimmed,
        category: result.category,
        recyclable: result.recyclable,
      }).catch((err) => console.warn('Failed to save history:', err))

      navigate('/result', { state: { result } })
    } catch {
      setValidationError('Unable to analyze the waste item. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center mb-10 md:mb-14 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
          <span className="text-sm font-medium text-primary">Powered by Generative AI</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Sustainable Waste Management{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Assistant
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Identify waste items and receive AI-powered disposal and recycling guidance.
        </p>
      </section>

      {/* Search Card */}
      <div className="w-full max-w-2xl">
        {isLoading ? (
          <div className="glass-card-solid p-8">
            <LoadingSpinner />
          </div>
        ) : (
          <SearchCard
            value={item}
            onChange={(val) => {
              setItem(val)
              if (validationError) setValidationError('')
            }}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
            error={validationError}
          />
        )}
      </div>

      {/* Feature hints */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl animate-fade-in animate-delay-300">
        {[
          { icon: '🔍', title: 'Identify', desc: 'Enter any everyday waste item' },
          { icon: '🤖', title: 'Analyze', desc: 'AI-powered disposal guidance' },
          { icon: '🌍', title: 'Recycle', desc: 'Eco-friendly suggestions' },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="glass-card p-5 text-center transition-all duration-300 hover:scale-105"
          >
            <span className="text-3xl">{icon}</span>
            <h3 className="mt-2 font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
