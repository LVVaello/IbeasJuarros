import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'

const MODULOS_PREVISTOS = [
  { titulo: 'Resumen ejecutivo', desc: 'Visión general del estado de ejecución del Plan: número de acciones en marcha, porcentaje de avance y principales hitos alcanzados.' },
  { titulo: 'Estado de ejecución', desc: 'Seguimiento acción por acción: en espera, en marcha, finalizada o cancelada. Con agente responsable y fecha de actualización.' },
  { titulo: 'Indicadores de resultado', desc: 'Evolución de los indicadores clave por Objetivo Estratégico, comparando situación inicial (diagnóstico) con situación actual.' },
  { titulo: 'Grado de cumplimiento', desc: 'Medición del avance del Plan respecto a los compromisos adquiridos y los objetivos establecidos para cada ámbito temático.' },
  { titulo: 'Previsiones y alertas', desc: 'Identificación de desviaciones, acciones con retraso y oportunidades de ajuste en la programación del Plan.' },
]

export default function CuadroMando() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Cuadro de Mando' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
            <h1 className="section-title" style={{ margin: 0 }}>Cuadro de Mando</h1>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)',
              background: 'var(--color-border-light)', color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}>Fase posterior</span>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            El Cuadro de Mando permitirá hacer un seguimiento continuo del Plan de Acción:
            qué se está ejecutando, cómo avanzan los indicadores y en qué medida se están
            alcanzando los objetivos estratégicos del municipio.
          </p>
        </div>

        <section className="section">
          <h2 className="section-title">Módulos previstos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {MODULOS_PREVISTOS.map((m, i) => (
              <div key={m.titulo} style={{
                display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start',
                padding: 'var(--space-md) var(--space-lg)',
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', opacity: 0.7,
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.75rem',
                  color: 'var(--color-text-muted)', width: 20, flexShrink: 0, paddingTop: 2,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '0.2rem' }}>{m.titulo}</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <div className="alert alert-info" style={{ marginBottom: 'var(--space-xl)' }}>
          <strong>Disponible cuando el Plan de Acción esté en marcha.</strong>{' '}
          El Cuadro de Mando se activará una vez aprobado el Plan y comenzadas las primeras actuaciones.
        </div>

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/plan-accion" className="btn btn-primary">Ver Plan de Acción</Link>
          <Link to="/diagnostico" className="btn btn-outline">Ver diagnóstico</Link>
        </div>
      </div>
    </div>
  )
}
