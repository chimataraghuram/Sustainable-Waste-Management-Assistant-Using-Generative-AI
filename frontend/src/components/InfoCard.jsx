const iconMap = {
  category: '🏷️',
  recyclable: '♻️',
  disposal: '📋',
  hazard: '⚠️',
  eco: '🌱',
}

function InfoCard({ title, icon, children, delay = 0, variant = 'default' }) {
  const variantStyles = {
    default: 'border-white/50',
    warning: 'border-amber-300/50 bg-amber-50/60',
    eco: 'border-primary/30 bg-emerald-50/60',
  }

  return (
    <div
      className={`glass-card-solid p-6 opacity-0 animate-fade-in-up ${variantStyles[variant]}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{iconMap[icon] || icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-600">{children}</div>
    </div>
  )
}

export default InfoCard
