import { Link } from 'react-router-dom'
import narrativa from '../data/narrativa.json'
import oes from '../data/oes.json'
import Breadcrumb from '../components/Breadcrumb'

export default function Retos() {
  const global = narrativa.global
  const oeNarrativa = narrativa.oe

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ to: '/diagnostico', label: 'Diagnóstico' }, { label: 'Retos' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 className="section-title">Retos del diagnóstico territorial</h1>
          <p style={{ maxWidth: 720, fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            Los retos identificados en el diagnóstico de Ibeas de Juarros, desde la lectura global
            del territorio hasta los ámbitos específicos de cada Objetivo Estratégico.
          </p>
        </div>

        {/* RETOS GLOBALES */}
        <section className="section">
          <h2 className="section-title">Retos generales</h2>
          <div className="narrativa-block">
            <ul className="narrativa-list">
              {global.retos?.map(r => (
                <li key={r.id}>
                  <strong style={{ color: 'var(--color-primary)' }}>{r.titulo}</strong>
                  <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0.5rem', lineHeight: 1.75 }}>
                    {r.texto}
                  </p>
                  {r.oe_relacionados?.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {r.oe_relacionados.map(id => {
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
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="divider" />

        {/* RETOS POR OE */}
        <section className="section">
          <h2 className="section-title">Retos por Objetivo Estratégico</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-xl)' }}>
            Cada OE identifica sus propios retos territoriales específicos.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {oes.map(oe => {
              const retos = oeNarrativa?.[String(oe.id)]?.retos ?? []
              if (retos.length === 0) return null
              return (
                <div key={oe.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
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
                  <ul className="narrativa-list" style={{ marginLeft: 'var(--space-md)', borderLeft: `3px solid ${oe.color}30`, paddingLeft: 'var(--space-md)' }}>
                    {retos.map(r => (
                      <li key={r.id} style={{ marginBottom: 'var(--space-md)' }}>
                        <strong style={{ color: oe.color }}>{r.titulo}</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', lineHeight: 1.7 }}>
                          {r.texto}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/propuestas" className="btn btn-primary">Ver propuestas →</Link>
          <Link to="/conclusiones" className="btn btn-outline">Ver conclusiones</Link>
          <Link to="/diagnostico" className="btn btn-outline">Diagnóstico global</Link>
        </div>
      </div>
    </div>
  )
}
