import { Link } from 'react-router-dom'
import OEIcon from './OEIcon'

export default function OECard({ oe, stats, compact = false, hideStats = false }) {
  const disponibles = stats?.disponibles ?? 0
  const total = stats?.total ?? 0
  const pct = total > 0 ? Math.round(100 * disponibles / total) : 0

  return (
    <Link
      to={`/objetivos/${oe.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      aria-label={`Ver ${oe.abreviatura}: ${oe.titulo}`}
    >
      <article
        style={{
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          border: `2px solid ${oe.color}22`,
          padding: compact ? 'var(--space-md)' : 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          height: '100%',
          transition: 'all var(--transition)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 6px 20px ${oe.color}30`
          e.currentTarget.style.borderColor = oe.color
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
          e.currentTarget.style.borderColor = `${oe.color}22`
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Header with icon */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
          <div style={{
            background: oe.colorLight || `${oe.color}15`,
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            flexShrink: 0,
          }}>
            <OEIcon id={oe.id} color={oe.color} size={28} />
          </div>
          <div>
            <span style={{
              display: 'inline-block',
              background: oe.color,
              color: 'white',
              borderRadius: 'var(--radius-full)',
              padding: '0.1rem 0.5rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.25rem',
            }}>
              {oe.abreviatura}
            </span>
            <h3 style={{
              fontSize: compact ? '0.85rem' : '0.9rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.3,
              margin: 0,
            }}>
              {oe.titulo_corto}
            </h3>
          </div>
        </div>

        {!compact && (
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            flex: 1,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {oe.descripcion}
          </p>
        )}

        {/* Stats */}
        {!hideStats && total > 0 && (
          <div style={{
            marginTop: 'auto',
            paddingTop: 'var(--space-sm)',
            borderTop: `1px solid ${oe.color}20`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {total} indicadores
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{
                width: 60,
                height: 4,
                background: `${oe.color}20`,
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: oe.color,
                  borderRadius: 2,
                }} />
              </div>
              <span style={{ fontSize: '0.7rem', color: oe.color, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                {pct}%
              </span>
            </div>
          </div>
        )}
      </article>
    </Link>
  )
}
