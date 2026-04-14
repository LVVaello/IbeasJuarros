import { Link } from 'react-router-dom'
import oes from '../data/oes.json'
import narrativa from '../data/narrativa.json'
import OECard from '../components/OECard'

const DIAGNOSTICO_ACCESOS = [
  {
    to: '/diagnostico',
    title: 'Diagnóstico global',
    desc: 'Lectura integrada del territorio: síntesis municipal, bloques temáticos, conclusiones y retos.',
    icon: '📋',
    color: 'var(--color-primary)',
  },
  {
    to: '/objetivos',
    title: '10 Objetivos Estratégicos',
    desc: 'El diagnóstico desplegado por ámbito: territorio, vivienda, movilidad, economía, cohesión social y más.',
    icon: '🎯',
    color: 'var(--color-oe1)',
  },
  {
    to: '/aportaciones',
    title: 'Realizar aportación',
    desc: 'Envía tus observaciones, propuestas o correcciones al diagnóstico a través del formulario de participación.',
    icon: '✏️',
    color: 'var(--color-oe6)',
  },
]

export default function Home() {
  const presentacion = narrativa.global?.presentacion ?? ''
  const conclusiones = narrativa.global?.conclusiones ?? []
  const retos = narrativa.global?.retos ?? []

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          {/* Cabecera institucional */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
            <img
              src="assets/escudo-ibeas.png?v=2"
              alt="Escudo de Ibeas de Juarros"
              style={{ height: 72, width: 'auto', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.12))', flexShrink: 0 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block',
                background: 'var(--color-accent)',
                color: 'var(--color-primary-dark)',
                padding: '0.2rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-sm)',
              }}>
                Agenda Urbana Española
              </div>
              <h1 style={{ margin: '0 0 0.3rem', lineHeight: 1.15 }}>
                Diagnóstico Territorial
              </h1>
              <p style={{ fontSize: '1.15rem', margin: 0, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                Ibeas de Juarros · Burgos · Castilla y León
              </p>
            </div>
            <img
              src="assets/logo-agenda-urbana-ibeas.png"
              alt="Agenda Urbana · Ibeas de Juarros"
              className="hide-mobile"
              style={{ height: 80, width: 'auto', flexShrink: 0 }}
              onError={e => {
                e.target.src = 'assets/logo-agenda-urbana.png'
                e.target.onerror = () => { e.target.style.display = 'none' }
              }}
            />
          </div>

          <p style={{ maxWidth: 680, fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.75 }}>
            {presentacion}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link to="/diagnostico" className="btn btn-accent btn-lg">
              Leer el diagnóstico
            </Link>
            <Link to="/objetivos" className="btn btn-outline btn-lg">
              Ver los 10 OE
            </Link>
          </div>
        </div>
      </section>

      {/* FRANJA DE CONTEXTO TERRITORIAL */}
      <div style={{ background: 'var(--color-primary-dark)', padding: 'var(--space-md) 0', borderBottom: '3px solid var(--color-accent)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-lg)', textAlign: 'center' }}>
            {[
              { value: '1.417', label: 'habitantes', unit: 'padrón 2023' },
              { value: '11 km', label: 'de Burgos', unit: 'corredor Arlanzón' },
              { value: '64%', label: 'superficie forestal', unit: 'del término municipal' },
              { value: '10', label: 'OE analizados', unit: 'Agenda Urbana' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
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

          {/* ACCESO AL DIAGNÓSTICO */}
          <section className="section">
            <h2 className="section-title">¿Qué contiene este diagnóstico?</h2>
            <div className="grid grid-3">
              {DIAGNOSTICO_ACCESOS.map(f => (
                <Link key={f.to} to={f.to} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: 'var(--space-xs)' }}>{f.icon}</div>
                      <h3 style={{ color: f.color, marginBottom: 'var(--space-xs)' }}>{f.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* CONCLUSIONES DESTACADAS */}
          {conclusiones.length > 0 && (
            <section className="section">
              <div className="flex items-center justify-between mb-lg" style={{ flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>
                  Conclusiones del diagnóstico
                </h2>
                <Link to="/diagnostico" className="btn btn-outline btn-sm">Ver todas →</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {conclusiones.slice(0, 3).map(c => (
                  <div key={c.id} style={{
                    borderLeft: '3px solid var(--color-primary)',
                    paddingLeft: 'var(--space-md)',
                    paddingTop: 'var(--space-xs)',
                    paddingBottom: 'var(--space-xs)',
                  }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-primary)', margin: '0 0 0.25rem', fontSize: '0.95rem' }}>{c.titulo}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.65 }}>{c.texto}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <hr className="divider" />

          {/* OBJETIVOS ESTRATÉGICOS */}
          <section className="section">
            <div className="flex items-center justify-between mb-lg" style={{ flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <div>
                <h2 className="section-title" style={{ marginBottom: 'var(--space-xs)', borderBottom: 'none' }}>
                  Objetivos Estratégicos
                </h2>
                <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                  Cada OE recoge la lectura diagnóstica, conclusiones, retos y propuestas de su ámbito territorial.
                </p>
              </div>
              <Link to="/objetivos" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-oe">
              {oes.map(oe => (
                <OECard key={oe.id} oe={oe} hideStats />
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* ACCESO SECUNDARIO AL DATASET */}
          <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', padding: 'var(--space-lg)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.25rem' }}>Visor completo de datos</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Consulta, filtra y exporta los indicadores del diagnóstico organizados por OE, grupo temático y fuente.
              </p>
            </div>
            <Link to="/datos" className="btn btn-outline" style={{ flexShrink: 0 }}>
              Acceder al visor →
            </Link>
          </section>

        </div>
      </div>
    </>
  )
}
