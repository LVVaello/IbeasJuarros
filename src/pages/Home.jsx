import { Link } from 'react-router-dom'
import oes from '../data/oes.json'
import narrativa from '../data/narrativa.json'
import OECard from '../components/OECard'

const MODULOS = [
  {
    num: 1, to: '/introduccion',
    titulo: 'Introducción',
    desc: 'Qué es la Agenda Urbana, qué supone para Ibeas de Juarros y cómo se estructura el proceso.',
    color: 'var(--color-primary)',
    estado: 'Disponible', estadoOk: true,
  },
  {
    num: 2, to: '/diagnostico',
    titulo: 'Diagnóstico territorial',
    desc: 'Análisis técnico del municipio a través de los 10 Objetivos Estratégicos de la Agenda Urbana Española.',
    color: 'var(--color-oe2)',
    estado: 'Disponible', estadoOk: true,
  },
  {
    num: 3, to: '/participacion',
    titulo: 'Participación ciudadana',
    desc: 'Recogida de visiones, retos y propuestas de vecinos y agentes locales. El proceso participativo está abierto.',
    color: 'var(--color-oe6)',
    estado: 'Abierto', estadoOk: true,
  },
  {
    num: 4, to: '/plan-accion',
    titulo: 'Plan de Acción',
    desc: 'Las actuaciones prioritarias del municipio: qué se va a hacer, con qué recursos y en qué plazos.',
    color: 'var(--color-oe4)',
    estado: 'En preparación', estadoOk: false,
  },
  {
    num: 5, to: '/cuadro-mando',
    titulo: 'Cuadro de Mando',
    desc: 'Seguimiento continuo del Plan: estado de ejecución, indicadores y grado de cumplimiento de los objetivos.',
    color: 'var(--color-oe7)',
    estado: 'Fase posterior', estadoOk: false,
  },
]

const STATS = [
  { value: '1.417', label: 'habitantes', unit: 'padrón 2023' },
  { value: '11 km', label: 'de Burgos', unit: 'corredor Arlanzón' },
  { value: '64%', label: 'superficie forestal', unit: 'del término municipal' },
  { value: '10', label: 'OE analizados', unit: 'Agenda Urbana' },
]

export default function Home() {
  const conclusiones = narrativa.global?.conclusiones ?? []

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', background: 'var(--color-accent)', color: 'var(--color-primary-dark)',
                padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem',
                fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em',
                textTransform: 'uppercase', marginBottom: 'var(--space-sm)',
              }}>
                Agenda Urbana Española
              </div>
              <h1 style={{ margin: '0 0 0.3rem', lineHeight: 1.15 }}>
                Agenda Urbana de Ibeas de Juarros
              </h1>
              <p style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                Diagnóstico · Participación · Plan de Acción · Seguimiento
              </p>
            </div>
            <div className="hide-mobile" style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-lg)',
              flexShrink: 0, paddingLeft: 'var(--space-lg)',
              borderLeft: '1px solid var(--color-border)', alignSelf: 'center',
            }}>
              <img src="assets/logo-agenda-urbana-ibeas.png" alt="Agenda Urbana · Ibeas de Juarros"
                style={{ height: 64, width: 'auto' }} onError={e => { e.target.style.display = 'none' }} />
              <img src="assets/logo-agenda-urbana.png" alt="Agenda Urbana Española"
                style={{ height: 64, width: 'auto' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
          </div>

          <p style={{ maxWidth: 660, fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.8 }}>
            Una web abierta que recoge el proceso completo de la Agenda Urbana del municipio:
            del análisis territorial a la participación ciudadana, el plan de acción y su seguimiento.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link to="/introduccion" className="btn btn-accent btn-lg">Conocer el proceso</Link>
            <Link to="/diagnostico" className="btn btn-outline btn-lg">Ver el diagnóstico</Link>
          </div>
        </div>
      </section>

      {/* ── FRANJA TERRITORIAL ── */}
      <div style={{ background: 'var(--color-primary-dark)', padding: 'var(--space-md) 0', borderBottom: '3px solid var(--color-accent)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-lg)', textAlign: 'center' }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600, fontFamily: 'var(--font-heading)', margin: '0.2rem 0 0.1rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{s.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOTO TERRITORIAL ── */}
      <div style={{ overflow: 'hidden', maxHeight: 320, position: 'relative' }}>
        <img
          src="assets/Ibeas-foto-8.jpeg"
          alt="Término municipal de Ibeas de Juarros"
          style={{ width: '100%', height: 320, objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(245,247,249,0.7) 100%)',
        }} />
      </div>

      <div className="page-content">
        <div className="container">

          {/* ── 5 MÓDULOS ── */}
          <section className="section">
            <h2 className="section-title">El proceso</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--space-xl)', maxWidth: 640 }}>
              La Agenda Urbana de Ibeas se organiza en cinco bloques complementarios.
              Cada uno aporta una capa de conocimiento o acción sobre el municipio.
            </p>
            <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              {MODULOS.map(m => (
                <Link key={m.num} to={m.to} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative', height: '100%',
                    padding: 'var(--space-lg)', background: 'white',
                    border: '1px solid var(--color-border)', borderLeft: `4px solid ${m.color}`,
                    borderRadius: 'var(--radius-lg)', transition: 'box-shadow var(--transition), transform var(--transition)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', background: m.color,
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0,
                      }}>{m.num}</div>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase', letterSpacing: '0.04em',
                        padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                        background: m.estadoOk ? (m.estado === 'Abierto' ? '#e3f2fd' : '#e8f5e9') : (m.estado === 'En preparación' ? '#fff3e0' : 'var(--color-border-light)'),
                        color: m.estadoOk ? (m.estado === 'Abierto' ? 'var(--color-primary)' : 'var(--color-available)') : (m.estado === 'En preparación' ? 'var(--color-partial)' : 'var(--color-text-muted)'),
                      }}>{m.estado}</span>
                    </div>
                    <h3 style={{ margin: '0 0 var(--space-xs)', fontSize: '1rem', fontWeight: 700, color: m.color }}>{m.titulo}</h3>
                    <p style={{ margin: '0 0 var(--space-sm)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{m.desc}</p>
                    <span style={{ fontSize: '0.8rem', color: m.color, fontWeight: 600 }}>Acceder →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* ── DIAGNÓSTICO DESTACADO ── */}
          <section className="section">
            <div className="flex items-center justify-between mb-lg" style={{ flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <div>
                <h2 className="section-title" style={{ marginBottom: 'var(--space-xs)', borderBottom: 'none' }}>
                  Diagnóstico territorial
                </h2>
                <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                  El módulo más desarrollado. Análisis por los 10 Objetivos Estratégicos de la Agenda Urbana.
                </p>
              </div>
              <Link to="/objetivos" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                Ver todos los OE →
              </Link>
            </div>

            {/* Accesos rápidos dentro del diagnóstico */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
              {[
                { to: '/diagnostico', label: 'Visión global' },
                { to: '/conclusiones', label: 'Conclusiones' },
                { to: '/retos', label: 'Retos' },
                { to: '/datos', label: 'Visor de datos' },
              ].map(a => (
                <Link key={a.to} to={a.to} className="btn btn-outline btn-sm">{a.label}</Link>
              ))}
            </div>

            {/* Conclusiones destacadas */}
            {conclusiones.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                {conclusiones.slice(0, 2).map(c => (
                  <div key={c.id} style={{
                    borderLeft: '3px solid var(--color-oe2)', paddingLeft: 'var(--space-md)',
                    paddingTop: 'var(--space-xs)', paddingBottom: 'var(--space-xs)',
                  }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-oe2)', margin: '0 0 0.2rem', fontSize: '0.9rem' }}>{c.titulo}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.65 }}>{c.texto}</p>
                  </div>
                ))}
                <Link to="/conclusiones" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                  Ver todas las conclusiones →
                </Link>
              </div>
            )}

            <div className="grid grid-oe">
              {oes.map(oe => (
                <OECard key={oe.id} oe={oe} hideStats />
              ))}
            </div>
          </section>

          <hr className="divider" />

          {/* ── CTA PARTICIPACIÓN ── */}
          <section style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 'var(--space-lg)', padding: 'var(--space-xl)',
            background: 'var(--color-border-light)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-oe6)',
            marginBottom: 'var(--space-2xl)',
          }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.35rem', fontSize: '1rem' }}>
                El proceso participativo está abierto
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0, maxWidth: 520 }}>
                Tu visión del municipio es parte del diagnóstico y del Plan de Acción.
                Puedes enviar aportaciones, identificar retos y proponer actuaciones.
              </p>
            </div>
            <Link to="/participacion" className="btn btn-accent" style={{ flexShrink: 0 }}>
              Participar →
            </Link>
          </section>

          {/* ── DATOS (secundario) ── */}
          <section style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 'var(--space-md)', padding: 'var(--space-lg)',
            background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.25rem', fontSize: '0.95rem' }}>Visor completo de datos</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Consulta, filtra y exporta los indicadores del diagnóstico organizados por OE y fuente.
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
