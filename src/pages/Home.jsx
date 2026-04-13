import { Link } from 'react-router-dom'
import oes from '../data/oes.json'
import municipio from '../data/municipio.json'
import OECard from '../components/OECard'
import OEIcon from '../components/OEIcon'

const stats = municipio.resumen_estadistico
const porOE = stats.por_oe

const FEATURES = [
  {
    to: '/diagnostico',
    title: 'Diagnóstico global',
    desc: 'Lectura integrada del territorio: contexto, bloques temáticos, conclusiones y retos municipales.',
    icon: '📋',
    color: 'var(--color-primary)',
  },
  {
    to: '/datos',
    title: 'Visor de datos',
    desc: 'Consulta, filtra y exporta los ' + stats.total_indicadores + ' indicadores del dataset completo.',
    icon: '📊',
    color: '#2e7d32',
  },
  {
    to: '/aportaciones',
    title: 'Realizar aportación',
    desc: 'Envía notas de diagnóstico, retos o propuestas a través del formulario de participación.',
    icon: '✏️',
    color: 'var(--color-oe6)',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            <img
              src="assets/escudo-ibeas.png"
              alt="Escudo de Ibeas de Juarros"
              style={{ height: 72, width: 'auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <div style={{
                display: 'inline-block',
                background: 'var(--color-accent)',
                color: 'var(--color-primary-dark)',
                padding: '0.2rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-sm)',
              }}>
                Agenda Urbana Española
              </div>
              <h1 style={{ margin: '0 0 0.25rem', lineHeight: 1.15 }}>
                Diagnóstico Territorial
              </h1>
              <p style={{ fontSize: '1.2rem', margin: 0, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                Ibeas de Juarros · Burgos
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }} className="hide-mobile">
              <img
                src="assets/logo-agenda-urbana.png"
                alt="Agenda Urbana Española"
                style={{ height: 80, width: 'auto' }}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
          </div>

          <p style={{ maxWidth: 680, fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', marginBottom: 'var(--space-xl)', lineHeight: 1.7 }}>
            Visor interactivo del diagnóstico territorial elaborado en el marco de la Agenda Urbana Española.
            Consulta los {stats.total_indicadores} indicadores disponibles, navega por los diez Objetivos Estratégicos
            y realiza aportaciones al proceso.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link to="/diagnostico" className="btn btn-accent btn-lg">
              Ver diagnóstico global
            </Link>
            <Link to="/objetivos" className="btn btn-outline-white btn-lg">
              Objetivos Estratégicos
            </Link>
            <Link to="/datos" className="btn btn-outline-white btn-lg">
              Visor de datos
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: 'var(--color-primary-dark)', padding: 'var(--space-md) 0', borderBottom: '3px solid var(--color-accent)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-lg)', textAlign: 'center' }}>
            {[
              { value: stats.total_indicadores, label: 'Indicadores', unit: 'en el diagnóstico' },
              { value: stats.disponibles, label: 'Disponibles', unit: `${stats.tasa_disponibilidad_pct}% del total` },
              { value: stats.no_disponibles, label: 'Sin dato', unit: 'vacíos identificados' },
              { value: 10, label: 'OE analizados', unit: 'Agenda Urbana' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600, fontFamily: 'var(--font-heading)', margin: '0.2rem 0 0.1rem' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{s.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">

          {/* OBJETIVOS ESTRATÉGICOS */}
          <section className="section">
            <div className="flex items-center justify-between mb-lg" style={{ flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>
                Objetivos Estratégicos
              </h2>
              <Link to="/objetivos" className="btn btn-outline btn-sm">
                Ver todos →
              </Link>
            </div>
            <p className="text-secondary mb-lg" style={{ maxWidth: 680 }}>
              El diagnóstico está organizado en torno a los 10 Objetivos Estratégicos de la Agenda Urbana Española.
              Cada OE agrupa los indicadores y la lectura temática correspondiente.
            </p>
            <div className="grid grid-oe">
              {oes.map(oe => (
                <OECard
                  key={oe.id}
                  oe={oe}
                  stats={{ total: porOE[String(oe.id)] ?? 0, disponibles: stats.resumen_oe?.[String(oe.id)]?.disponibles ?? 0 }}
                  compact
                />
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* FEATURE BLOCKS */}
          <section className="section">
            <h2 className="section-title">¿Qué puedes hacer aquí?</h2>
            <div className="grid grid-3">
              {FEATURES.map(f => (
                <Link key={f.to} to={f.to} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: 'var(--space-xs)' }}>{f.icon}</div>
                      <h3 style={{ color: f.color, marginBottom: 'var(--space-xs)' }}>{f.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>{f.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* FUENTES */}
          <section>
            <h3 style={{ marginBottom: 'var(--space-md)' }}>Principales fuentes de datos</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              {(stats.fuentes ?? []).slice(0, 8).map((f, i) => (
                <span key={i} className="badge badge-light" style={{ fontSize: '0.72rem' }}>
                  {f.replace('Fuente : ', '').replace('CSV maestro ', '')}
                </span>
              ))}
              <Link to="/datos" className="badge badge-primary" style={{ fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'none' }}>
                Ver todas las fuentes →
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
