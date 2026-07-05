import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav className="glass-card-solid sticky top-0 z-50 mx-4 mt-4 md:mx-auto md:max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
            ♻️
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            WasteGuide AI
          </span>
        </Link>

        <ul className="flex items-center gap-1 md:gap-2">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
