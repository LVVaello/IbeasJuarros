import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--color-primary-dark)',
      color: 'rgba(255,255,255,0.75)',
      padding: 'var(--space-xl) 0',
      marginTop: 'auto',
      fontSize: '0.875rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-xl)' }}>
          <div>
            <p style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
              Ibeas de Juarros
            </p>
            <p style={{ marginBottom: 0 }}>
              Diagnóstico Territorial<br />
              Agenda Urbana Española
            </p>
          </div>
          <div>
            <p style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navegación
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                ['/diagnostico', 'Diagnóstico global'],
                ['/objetivos', 'Objetivos Estratégicos'],
                ['/datos', 'Visor de datos'],
                ['/aportaciones', 'Realizar aportación'],
              ].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}
                  onMouseOver={e => e.target.style.color = 'white'}
                  onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 'var(--space-sm)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Acerca del proyecto
            </p>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
              Visor de datos del diagnóstico territorial elaborado en el marco de la{' '}
              <a href="https://www.mitma.gob.es/arquitectura-vivienda-y-suelo/urbanismo-y-politica-de-suelo/agenda-urbana-espanola"
                target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)' }}>
                Agenda Urbana Española
              </a>.
            </p>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: 'var(--space-lg) 0 var(--space-md)' }} />
        <p style={{ fontSize: '0.75rem', textAlign: 'center', margin: 0 }}>
          © {year} Ayuntamiento de Ibeas de Juarros · Datos procedentes de fuentes oficiales ·{' '}
          <Link to="/datos" style={{ color: 'rgba(255,255,255,0.6)' }}>Ver fuentes</Link>
        </p>
      </div>
    </footer>
  )
}
