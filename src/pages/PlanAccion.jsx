import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const SECCIONES_PREVISTAS = [
  { titulo: 'Listado de acciones', desc: 'Catálogo de actuaciones prioritarias organizadas por ámbito temático y Objetivo Estratégico, con descripción, agente responsable y horizonte temporal.' },
  { titulo: 'Fichas de actuación', desc: 'Cada acción contará con una ficha detallada: descripción, justificación, OE vinculados, coste estimado, indicadores de seguimiento y fuentes de financiación.' },
  { titulo: 'Relación con los OE', desc: 'Visualización de la contribución de cada acción a los 10 Objetivos Estratégicos de la Agenda Urbana Española.' },
  { titulo: 'Visor cartográfico', desc: 'Mapa interactivo del término municipal con localización de las actuaciones previstas y acceso a la ficha de cada una.' },
]

export default function PlanAccion() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Plan de Acción' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
            <h1 className="section-title" style={{ margin: 0 }}>Plan de Acción</h1>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)',
              background: '#fff3e0', color: 'var(--color-partial)',
              border: '1px solid #ffe0b2',
            }}>En preparación</span>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            El Plan de Acción traducirá los resultados del diagnóstico y la participación ciudadana
            en un conjunto de actuaciones concretas, priorizadas y viables para el municipio.
            Se construirá sobre las conclusiones del diagnóstico y las aportaciones recogidas.
          </p>
        </div>

        <section className="section">
          <h2 className="section-title">Contenido previsto</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {SECCIONES_PREVISTAS.map((s, i) => (
              <div key={s.titulo} style={{
                padding: 'var(--space-lg)', background: 'white',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
                borderTop: '3px solid var(--color-border)',
                opacity: 0.75,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--color-border)', color: 'var(--color-text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem',
                  marginBottom: 'var(--space-sm)',
                }}>{i + 1}</div>
                <h4 style={{ margin: '0 0 var(--space-xs)', fontSize: '0.9rem', color: 'var(--color-text)' }}>{s.titulo}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <div className="alert alert-info" style={{ marginBottom: 'var(--space-xl)' }}>
          <strong>Próxima fase.</strong>{' '}
          El Plan de Acción se elaborará una vez concluido el diagnóstico territorial y el proceso
          de participación ciudadana. Las aportaciones recibidas serán parte de su base.
        </div>

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/diagnostico" className="btn btn-primary">Ver diagnóstico</Link>
          <Link to="/participacion" className="btn btn-outline">Participar en el proceso</Link>
          <Link to="/introduccion" className="btn btn-outline">Sobre el proyecto</Link>
        </div>
      </div>
    </div>
  )
}
