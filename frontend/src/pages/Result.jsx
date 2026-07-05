import { useLocation, useNavigate, Link } from 'react-router-dom'
import InfoCard from '../components/InfoCard'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <span className="text-6xl mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Analysis Found</h2>
        <p className="text-gray-500 mb-6">Analyze a waste item first to see results.</p>
        <Link to="/" className="btn-primary">
          Go to Home
        </Link>
      </div>
    )
  }

  const { item, category, recyclable, disposal_steps, hazard_warning, eco_suggestion } = result

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <p className="text-sm font-medium text-primary mb-2">Analysis Result</p>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{item}</h1>
      </div>

      {/* Result Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <InfoCard title="Waste Category" icon="category" delay={100}>
          <p className="text-xl font-medium text-gray-800">{category}</p>
        </InfoCard>

        <InfoCard title="Recyclable" icon="recyclable" delay={200}>
          <p
            className={`text-xl font-medium ${
              recyclable?.toLowerCase() === 'yes'
                ? 'text-primary'
                : 'text-gray-700'
            }`}
          >
            {recyclable}
          </p>
        </InfoCard>

        <InfoCard title="Disposal Steps" icon="disposal" delay={300}>
          <ul className="space-y-2">
            {disposal_steps?.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Hazard Warning" icon="hazard" delay={400} variant="warning">
          <p>{hazard_warning}</p>
        </InfoCard>

        <div className="md:col-span-2">
          <InfoCard title="Eco Suggestion" icon="eco" delay={500} variant="eco">
            <p className="text-lg">{eco_suggestion}</p>
          </InfoCard>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={() => navigate('/')} className="btn-primary w-full sm:w-auto">
          Analyze Another Item
        </button>
        <Link to="/history" className="btn-secondary w-full sm:w-auto text-center">
          View History
        </Link>
      </div>
    </div>
  )
}

export default Result
