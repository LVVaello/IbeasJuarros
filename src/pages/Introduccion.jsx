import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const FASES = [
  { num: 1, titulo: 'Introducción', desc: 'Contexto institucional, territorial y marco del proyecto.', to: '/introduccion', color: 'var(--color-primary)', activa: true },
  { num: 2, titulo: 'Diagnóstico territorial', desc: 'Análisis técnico del municipio a través de los 10 Objetivos Estratégicos de la Agenda Urbana.', to: '/diagnostico', color: 'var(--color-oe2)' },
  { num: 3, titulo: 'Participación ciudadana', desc: 'Recogida de visiones, retos y propuestas de vecinos y agentes locales.', to: '/participacion', color: 'var(--color-oe6)' },
  { num: 4, titulo: 'Plan de Acción', desc: 'Definición de las actuaciones prioritarias y su vinculación con los objetivos estratégicos.', to: '/plan-accion', color: 'var(--color-oe4)' },
  { num: 5, titulo: 'Cuadro de Mando', desc: 'Seguimiento, evaluación y grado de cumplimiento de las acciones del Plan.', to: '/cuadro-mando', color: 'var(--color-oe7)' },
]

export default function Introduccion() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Introducción' }]} />

        {/* Qué es la Agenda Urbana */}
        <section className="section">
          <h1 className="section-title">La Agenda Urbana de Ibeas de Juarros</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
                La <strong style={{ color: 'var(--color-primary)' }}>Agenda Urbana Española</strong> es el marco de política
                urbana del Gobierno de España, alineado con la Nueva Agenda Urbana de Naciones Unidas y los
                Objetivos de Desarrollo Sostenible de la Agenda 2030. Su propósito es orientar a los municipios
                hacia un modelo de desarrollo más equilibrado, sostenible e inclusivo.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 0 }}>
                Para municipios como Ibeas de Juarros, la Agenda Urbana ofrece una metodología estructurada
                para conocer mejor el territorio, identificar sus fortalezas y debilidades, y definir un
                camino de actuación concreto y priorizado.
              </p>
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="assets/Ibeas-foto-2.jpeg"
                alt="Ayuntamiento de Ibeas de Juarros"
                style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Por qué Ibeas */}
        <section className="section">
          <h2 className="section-title">Por qué este proceso en Ibeas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            {[
              { titulo: 'Un municipio en transformación', desc: 'Ibeas de Juarros ha experimentado un importante crecimiento demográfico en las últimas décadas, impulsado por su posición en el corredor del Arlanzón, a 11 km de Burgos. Gestionar ese crecimiento con criterio es el reto central.' },
              { titulo: 'Territorio y paisaje como activos', desc: 'Con más del 64% de superficie forestal y un entorno natural de alto valor, el municipio tiene en el territorio uno de sus principales activos. La Agenda Urbana ayuda a ponerlo en valor sin comprometer su carácter.' },
              { titulo: 'Un instrumento para decidir mejor', desc: 'Disponer de un diagnóstico técnico riguroso y un Plan de Acción fundamentado permite al Ayuntamiento tomar decisiones más informadas, priorizar inversiones y acceder a financiación europea y nacional.' },
            ].map(b => (
              <div key={b.titulo} className="card">
                <div className="card-body">
                  <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)', fontSize: '0.95rem' }}>{b.titulo}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <img
              src="assets/Ibeas-foto-4.jpeg"
              alt="Mural de Ibeas de Juarros"
              style={{ width: '100%', height: 280, objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
          </div>
        </section>

        <hr className="divider" />

        {/* Las 5 fases */}
        <section className="section">
          <h2 className="section-title">Estructura del proyecto</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--space-xl)', maxWidth: 640 }}>
            El trabajo se organiza en cinco bloques complementarios. Cada uno aporta una capa de
            conocimiento o acción sobre el municipio.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {FASES.map(f => (
              <Link key={f.num} to={f.to} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-lg)',
                  padding: 'var(--space-lg)', background: 'white',
                  border: '1px solid var(--color-border)',
                  borderLeft: `4px solid ${f.color}`,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'box-shadow var(--transition), transform var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateX(2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: f.color,
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                  }}>{f.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: f.color, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {f.titulo}
                      {f.activa && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: f.color, color: 'white', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)' }}>aquí</span>}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{f.desc}</p>
                  </div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', flexShrink: 0 }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/diagnostico" className="btn btn-primary">Ver el diagnóstico →</Link>
          <Link to="/participacion" className="btn btn-outline">Participar</Link>
        </div>
      </div>
    </div>
  )
}
