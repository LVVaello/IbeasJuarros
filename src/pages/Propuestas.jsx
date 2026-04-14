import { Link } from 'react-router-dom'
import config from '../data/config.json'
import narrativa from '../data/narrativa.json'
import oes from '../data/oes.json'
import Breadcrumb from '../components/Breadcrumb'

const PRIORIDAD_COLOR = { alta: 'var(--color-unavailable)', media: 'var(--color-partial)', baja: 'var(--color-available)' }
const PRIORIDAD_BG = { alta: '#fde8e8', media: '#fff3e0', baja: '#e8f5e9' }

export default function Propuestas() {
  const global = narrativa.global
  const oeNarrativa = narrativa.oe
  const formUrl = config.google_form?.url ?? '#'

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ to: '/diagnostico', label: 'Diagnóstico' }, { label: 'Propuestas' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 className="section-title">Propuestas de actuación</h1>
          <p style={{ maxWidth: 720, fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            Propuestas derivadas del diagnóstico territorial de Ibeas de Juarros, organizadas
            desde la lectura global del municipio hasta los ámbitos específicos de cada OE.
            Las propuestas de prioridad alta responden a retos estructurales que requieren atención inmediata.
          </p>
        </div>

        {/* PROPUESTAS GLOBALES */}
        <section className="section">
          <h2 className="section-title">Propuestas generales</h2>
          {global.propuestas?.some(p => p.titulo?.includes('Pendiente')) ? (
            <div className="alert alert-info">
              <strong>En elaboración.</strong> Las propuestas globales se completarán a partir del proceso participativo.
              Puedes <Link to="/aportaciones" style={{ color: 'inherit', fontWeight: 700 }}>enviar tu aportación aquí</Link>.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {global.propuestas?.map(p => (
                <PropuestaCard key={p.id} propuesta={p} oes={oes} />
              ))}
            </div>
          )}
        </section>

        <hr className="divider" />

        {/* PROPUESTAS POR OE */}
        <section className="section">
          <h2 className="section-title">Propuestas por Objetivo Estratégico</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-xl)' }}>
            Propuestas específicas derivadas del diagnóstico de cada ámbito temático.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            {oes.map(oe => {
              const propuestas = (oeNarrativa?.[String(oe.id)]?.propuestas ?? [])
                .filter(p => !p.titulo?.includes('Pendiente'))
              if (propuestas.length === 0) return null
              return (
                <div key={oe.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                    <span className="badge" style={{ background: oe.color, color: 'white', fontSize: '0.72rem', flexShrink: 0 }}>
                      {oe.abreviatura}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>
                      {oe.titulo_corto}
                    </h3>
                    <Link to={`/objetivos/${oe.id}`} style={{
                      marginLeft: 'auto', fontSize: '0.78rem', color: oe.color,
                      fontWeight: 600, textDecoration: 'none', flexShrink: 0,
                    }}>
                      Ver OE →
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginLeft: 'var(--space-md)', borderLeft: `3px solid ${oe.color}30`, paddingLeft: 'var(--space-md)' }}>
                    {propuestas.map(p => (
                      <PropuestaCard key={p.id} propuesta={p} oes={oes} accentColor={oe.color} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <hr className="divider" />

        {/* CTA PARTICIPACIÓN */}
        <div className="alert alert-info" style={{ marginBottom: 'var(--space-xl)' }}>
          <strong>¿Tienes una propuesta para el municipio?</strong>{' '}
          El proceso participativo está abierto.{' '}
          <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 700 }}>
            Envía tu aportación →
          </a>
        </div>

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/conclusiones" className="btn btn-outline">Ver conclusiones</Link>
          <Link to="/retos" className="btn btn-outline">Ver retos</Link>
          <Link to="/diagnostico" className="btn btn-outline">Diagnóstico global</Link>
          <Link to="/aportaciones" className="btn btn-accent">Realizar aportación</Link>
        </div>
      </div>
    </div>
  )
}

function PropuestaCard({ propuesta, oes, accentColor }) {
  const prioridad = propuesta.prioridad
  const color = PRIORIDAD_COLOR[prioridad]
  const bg = PRIORIDAD_BG[prioridad]
  const titleColor = accentColor ?? 'var(--color-primary)'

  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      borderLeft: prioridad ? `4px solid ${color ?? 'var(--color-border)'}` : undefined,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
        <strong style={{ color: titleColor, fontSize: '0.95rem', flex: 1 }}>{propuesta.titulo}</strong>
        {prioridad && prioridad !== 'pendiente' && (
          <span style={{
            display: 'inline-block',
            padding: '0.15rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.68rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: bg,
            color: color,
            flexShrink: 0,
          }}>
            {prioridad}
          </span>
        )}
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.7 }}>
        {propuesta.texto}
      </p>
      {propuesta.oe_relacionados?.length > 0 && (
        <div style={{ marginTop: 'var(--space-sm)', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
          {propuesta.oe_relacionados.map(id => {
            const oe = oes.find(o => o.id === id)
            return oe ? (
              <Link key={id} to={`/objetivos/${id}`} style={{
                display: 'inline-block', padding: '0.1rem 0.5rem',
                background: oe.colorLight, color: oe.color,
                borderRadius: 'var(--radius-full)', fontSize: '0.68rem',
                fontWeight: 700, textDecoration: 'none',
              }}>
                {oe.abreviatura}
              </Link>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}
