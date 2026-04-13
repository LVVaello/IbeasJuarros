import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Ruta de navegación" style={{ marginBottom: 'var(--space-lg)' }}>
      <ol style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
      }}>
        <li>
          <Link to="/" style={{ color: 'var(--color-primary)' }}>Inicio</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span aria-hidden="true" style={{ color: 'var(--color-border)' }}>›</span>
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} style={{ color: 'var(--color-primary)' }}>{item.label}</Link>
            ) : (
              <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
