import { Link } from 'react-router-dom'
import config from '../data/config.json'
import oes from '../data/oes.json'
import Breadcrumb from '../components/Breadcrumb'

const FORM_URL = config.google_form.url
const EMBED_URL = FORM_URL.replace('/viewform', '/viewform?embedded=true')
const IS_PLACEHOLDER = !FORM_URL || FORM_URL.includes('PLACEHOLDER')

export default function Aportaciones() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Aportaciones y notas' }]} />

        <div style={{ maxWidth: 800 }}>
          <h1 className="section-title">Realizar una aportación</h1>
          <p className="text-secondary" style={{ fontSize: '1.05rem', marginBottom: 'var(--space-xl)' }}>
            Este formulario permite recoger notas de diagnóstico, identificar retos y proponer
            actuaciones en el marco de la elaboración de la Agenda Urbana de Ibeas de Juarros.
          </p>

          {/* Info blocks */}
          <div className="grid grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
            {[
              { icon: '🔍', title: 'Diagnóstico', desc: 'Comparte datos, valoraciones o matices sobre la realidad del municipio.' },
              { icon: '⚡', title: 'Retos', desc: 'Identifica los principales retos y desafíos que ves en el territorio.' },
              { icon: '💡', title: 'Propuestas', desc: 'Propón actuaciones, proyectos o medidas para abordar los retos identificados.' },
            ].map(b => (
              <div key={b.title} className="card">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 'var(--space-sm)' }}>{b.icon}</div>
                  <h4 style={{ marginBottom: 'var(--space-xs)' }}>{b.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Acceso directo por OE */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3 style={{ margin: 0, fontSize: '1rem' }}>Aportar por Objetivo Estratégico</h3>
            </div>
            <div className="card-body">
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                Puedes acceder al formulario directamente desde cada OE o usar el acceso general a continuación.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                {oes.map(oe => (
                  <a
                    key={oe.id}
                    href={buildFormUrl(oe.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.35rem 0.75rem',
                      background: oe.colorLight,
                      color: oe.color,
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      textDecoration: 'none',
                      border: `1px solid ${oe.color}30`,
                      transition: 'all var(--transition)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = oe.color; e.currentTarget.style.color = 'white' }}
                    onMouseLeave={e => { e.currentTarget.style.background = oe.colorLight; e.currentTarget.style.color = oe.color }}
                  >
                    {oe.abreviatura}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form embed or link */}
          {IS_PLACEHOLDER ? (
            <div className="alert alert-placeholder">
              <strong>Formulario pendiente de configurar.</strong><br />
              La URL del formulario de Google Forms está marcada como pendiente en <code>src/data/config.json</code>.
              Consulta <strong>TODO.md</strong> para ver los pasos exactos.
            </div>
          ) : (
            <>
              <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
                <div className="card-header">
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>Formulario de aportaciones</h3>
                </div>
                <div style={{ padding: 0 }}>
                  <iframe
                    src={EMBED_URL}
                    width="100%"
                    height="860"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Formulario de aportaciones - Agenda Urbana Ibeas de Juarros"
                    style={{ display: 'block' }}
                  >
                    Cargando formulario…
                  </iframe>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                Si el formulario no carga correctamente,{' '}
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                  ábrelo en una ventana nueva
                </a>.
                Las respuestas son gestionadas por Google Forms.
              </p>
            </>
          )}

          <hr className="divider" />

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link to="/objetivos" className="btn btn-outline">← Ver Objetivos Estratégicos</Link>
            {!IS_PLACEHOLDER && (
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Abrir formulario en nueva pestaña ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function buildFormUrl(oeId) {
  const { url_base_prefill, field_oe } = config.google_form
  if (!url_base_prefill || url_base_prefill.includes('PLACEHOLDER')) return config.google_form.url
  if (!field_oe || field_oe.includes('PENDIENTE')) return url_base_prefill
  return `${url_base_prefill}&${field_oe}=OE+${oeId}`
}
