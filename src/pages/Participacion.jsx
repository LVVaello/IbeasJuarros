import { Link } from 'react-router-dom'
import config from '../data/config.json'
import oes from '../data/oes.json'
import resultados from '../data/participacion_resultados.json'
import Breadcrumb from '../components/Breadcrumb'

const FORM_URL = config.google_form.url

const maxMenciones = Math.max(...resultados.sondeo.prioridades.map(p => p.menciones))

export default function Participacion() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Participación ciudadana' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 720 }}>
          <h1 className="section-title">Participación ciudadana</h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            La Agenda Urbana de Ibeas de Juarros se construye con la participación de las personas
            que conocen y viven el municipio. El proceso participativo ha concluido su fase de recogida
            y los resultados ya forman parte del marco estratégico del municipio.
          </p>
        </div>

        {/* Proceso participativo */}
        <section className="section">
          <h2 className="section-title">El proceso participativo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            {[
              { titulo: 'Taller municipal', desc: 'Grupo focal con vecinos y agentes locales para contrastar el diagnóstico técnico con la experiencia directa del territorio.', estado: 'Realizado' },
              { titulo: 'Formulario abierto', desc: `${resultados.meta.participantes_sondeo} personas respondieron el sondeo online. Las aportaciones han quedado registradas e integradas en la síntesis.`, estado: 'Cerrado' },
              { titulo: 'Integración en el Plan', desc: 'Los resultados de la participación alimentan el marco estratégico y orientarán el Plan de Acción.', estado: 'En proceso' },
            ].map(b => (
              <div key={b.titulo} className="card">
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{b.titulo}</h4>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                      textTransform: 'uppercase', letterSpacing: '0.04em',
                      padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                      background: b.estado === 'Realizado' || b.estado === 'Cerrado' ? '#e8f5e9' : b.estado === 'En proceso' ? '#fff3e0' : 'var(--color-border-light)',
                      color: b.estado === 'Realizado' || b.estado === 'Cerrado' ? 'var(--color-available)' : b.estado === 'En proceso' ? 'var(--color-partial)' : 'var(--color-text-muted)',
                    }}>{b.estado}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img
              src="assets/Ibeas-foto-5.jpeg"
              alt="Parque y arroyo en Ibeas de Juarros"
              style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'center 55%', display: 'block' }}
            />
          </div>
        </section>

        <hr className="divider" />

        {/* Resultados del sondeo */}
        <section className="section">
          <h2 className="section-title">Resultados del sondeo</h2>
          <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 auto' }}>
              <div style={{
                background: 'var(--color-primary)', color: 'white',
                borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)',
                textAlign: 'center', minWidth: 140,
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                  {resultados.meta.satisfaccion_media}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, margin: '0.25rem 0 0.5rem' }}>sobre {resultados.meta.escala}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>satisfacción media</div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{resultados.meta.participantes_sondeo}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.2rem' }}>personas participaron</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-md)' }}>
                {resultados.sondeo.resumen}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                {resultados.sondeo.insights.map((ins, i) => (
                  <div key={i} style={{
                    fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
                    paddingLeft: 'var(--space-sm)', borderLeft: '2px solid var(--color-accent)',
                    marginBottom: 'var(--space-xs)',
                  }}>
                    {ins}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-heading)' }}>
            Prioridades identificadas (menciones)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: 'var(--space-xl)' }}>
            {resultados.sondeo.prioridades.map((p, i) => (
              <div key={p.tema} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div style={{ width: 24, textAlign: 'right', fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: i < 3 ? 600 : 400 }}>{p.tema}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{p.menciones}</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--color-border-light)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      width: `${Math.round(100 * p.menciones / maxMenciones)}%`,
                      background: i === 0 ? 'var(--color-primary)' : i < 3 ? 'var(--color-primary-light)' : 'var(--color-border)',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-heading)' }}>
            Prioridades de mejora
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {resultados.sondeo.prioridades_mejora.map((p, i) => (
              <div key={p.tema} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)',
                background: i === 0 ? 'var(--color-primary)' : i < 2 ? 'var(--color-border-light)' : 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--font-heading)',
                  color: i === 0 ? 'var(--color-accent)' : 'var(--color-primary)',
                }}>{p.pct}%</span>
                <span style={{ fontSize: '0.78rem', color: i === 0 ? 'white' : 'var(--color-text-secondary)' }}>{p.tema}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Resultados del taller */}
        <section className="section">
          <h2 className="section-title">Resultados del taller</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-xl)', maxWidth: 700 }}>
            {resultados.focus_group.resumen}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {resultados.focus_group.areas.map(area => (
              <div key={area.id} className="card">
                <div className="card-header">
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-primary)' }}>{area.nombre}</h4>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{area.descripcion}</p>
                </div>
                <div className="card-body" style={{ paddingTop: 'var(--space-md)' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-available)', marginBottom: 'var(--space-xs)' }}>
                    Activos y fortalezas
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-md)' }}>
                    {area.activos.map(a => (
                      <li key={a} style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', padding: '0.2rem 0 0.2rem 1rem', position: 'relative', lineHeight: 1.55 }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-available)', fontWeight: 700 }}>+</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-partial)', marginBottom: 'var(--space-xs)' }}>
                    Necesidades y retos
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {area.retos.map(r => (
                      <li key={r} style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', padding: '0.2rem 0 0.2rem 1rem', position: 'relative', lineHeight: 1.55 }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--color-partial)', fontWeight: 700 }}>›</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Integración en el Plan */}
        <section className="section">
          <h2 className="section-title">Integración en el Plan</h2>
          <div className="narrativa-block" style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', margin: 0 }}>
              {resultados.integracion.texto}
            </p>
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-heading)' }}>
            Líneas de actuación derivadas de la participación
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {resultados.integracion.lineas.map(linea => (
              <div key={linea.num} style={{
                padding: 'var(--space-lg)', background: 'white',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-primary)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--color-primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
                  }}>{linea.num}</div>
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>{linea.titulo}</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {linea.items.map(item => (
                    <li key={item} style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', padding: '0.2rem 0 0.2rem 0.75rem', position: 'relative', lineHeight: 1.55 }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 700 }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <Link to="/marco-estrategico" className="btn btn-primary">
              Ver el marco estratégico →
            </Link>
          </div>
        </section>

        <hr className="divider" />

        {/* Acceso por OE */}
        <section className="section">
          <h2 className="section-title">Aportar por Objetivo Estratégico</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
            El formulario de participación permanece disponible para consulta y seguimiento.
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
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/marco-estrategico" className="btn btn-primary">Marco estratégico →</Link>
          <Link to="/diagnostico" className="btn btn-outline">Ver diagnóstico</Link>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Consultar formulario ↗
          </a>
        </div>
      </div>
    </div>
  )
}
