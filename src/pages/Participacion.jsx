import { Link } from 'react-router-dom'
import config from '../data/config.json'
import oes from '../data/oes.json'
import Breadcrumb from '../components/Breadcrumb'

const FORM_URL = config.google_form.url
const EMBED_URL = FORM_URL + '?embedded=true'

export default function Participacion() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Participación ciudadana' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 720 }}>
          <h1 className="section-title">Participación ciudadana</h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            La Agenda Urbana de Ibeas de Juarros se construye con la participación de las personas
            que conocen y viven el municipio. Tu visión es parte del diagnóstico y del Plan de Acción.
          </p>
        </div>

        {/* Proceso participativo */}
        <section className="section">
          <h2 className="section-title">El proceso participativo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            {[
              { titulo: 'Taller municipal', desc: 'Se ha realizado un taller de participación con vecinos y agentes locales para contrastar el diagnóstico técnico con la experiencia directa del territorio.', estado: 'Realizado' },
              { titulo: 'Formulario abierto', desc: 'El formulario permite enviar observaciones, identificar retos y proponer actuaciones en cualquier momento del proceso.', estado: 'Abierto' },
              { titulo: 'Integración en el Plan', desc: 'Las aportaciones recibidas se incorporarán al Plan de Acción y al proceso de toma de decisiones municipal.', estado: 'Próximamente' },
            ].map(b => (
              <div key={b.titulo} className="card">
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{b.titulo}</h4>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                      padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                      background: b.estado === 'Realizado' ? '#e8f5e9' : b.estado === 'Abierto' ? '#e3f2fd' : 'var(--color-border-light)',
                      color: b.estado === 'Realizado' ? 'var(--color-available)' : b.estado === 'Abierto' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    }}>{b.estado}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Acceso por OE */}
        <section className="section">
          <h2 className="section-title">Aportar por Objetivo Estratégico</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
            Si tu aportación está relacionada con un ámbito concreto, puedes acceder al formulario directamente desde cada OE.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            {oes.map(oe => (
              <a key={oe.id} href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.35rem 0.75rem', background: oe.colorLight, color: oe.color,
                borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700,
                fontFamily: 'var(--font-heading)', textDecoration: 'none',
                border: `1px solid ${oe.color}30`, transition: 'all var(--transition)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = oe.color; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = oe.colorLight; e.currentTarget.style.color = oe.color }}
              >
                {oe.abreviatura}
              </a>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Formulario */}
        <section className="section">
          <h2 className="section-title">Formulario de aportaciones</h2>
          <div className="card" style={{ marginBottom: 'var(--space-md)', overflow: 'hidden' }}>
            <iframe
              src={EMBED_URL}
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Formulario de participación - Agenda Urbana Ibeas de Juarros"
              style={{ display: 'block' }}
            >
              Cargando formulario…
            </iframe>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            Si el formulario no carga,{' '}
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              ábrelo en una ventana nueva
            </a>.
          </p>
        </section>

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            Abrir formulario ↗
          </a>
          <Link to="/diagnostico" className="btn btn-outline">Ver diagnóstico</Link>
          <Link to="/introduccion" className="btn btn-outline">Sobre el proyecto</Link>
        </div>
      </div>
    </div>
  )
}
