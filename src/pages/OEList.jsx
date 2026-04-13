import { Link } from 'react-router-dom'
import oes from '../data/oes.json'
import municipio from '../data/municipio.json'
import OECard from '../components/OECard'
import Breadcrumb from '../components/Breadcrumb'

const stats = municipio.resumen_estadistico

export default function OEList() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Objetivos Estratégicos' }]} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div>
            <h1 className="section-title">Objetivos Estratégicos</h1>
            <p style={{ maxWidth: 680, color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>
              La Agenda Urbana Española articula el diagnóstico territorial en torno a diez Objetivos Estratégicos.
              Cada OE recoge los indicadores, la lectura diagnóstica y los retos asociados a ese ámbito.
            </p>
          </div>
          <div style={{
            background: 'var(--color-primary)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-md) var(--space-lg)',
            textAlign: 'center',
            minWidth: 120,
            flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', lineHeight: 1 }}>10</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.25rem', fontWeight: 600 }}>OE activos</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-lg)',
          marginBottom: 'var(--space-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-lg)',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-primary)' }}>
              {stats.total_indicadores}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>indicadores totales</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', color: '#2e7d32' }}>
              {stats.disponibles}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>con dato disponible</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-unavailable)' }}>
              {stats.no_disponibles}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>sin dato</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-partial)' }}>
              {stats.tasa_disponibilidad_pct}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>tasa disponibilidad</div>
          </div>
        </div>

        {/* OE Grid */}
        <div className="grid grid-oe">
          {oes.map(oe => {
            const oStats = stats.resumen_oe?.[String(oe.id)]
            return (
              <OECard
                key={oe.id}
                oe={oe}
                stats={{
                  total: oStats?.total ?? 0,
                  disponibles: oStats?.disponibles ?? 0,
                }}
              />
            )
          })}
        </div>

        <hr className="divider" />

        {/* Note on OE 9 */}
        {stats.resumen_oe?.['9']?.total === 0 && (
          <div className="alert alert-warning" style={{ marginBottom: 'var(--space-lg)' }}>
            <strong>OE 9 · Innovación digital:</strong> La matriz actual no incluye indicadores asignados a este objetivo.
            Es un vacío identificado que se abordará en fases posteriores del diagnóstico.
          </div>
        )}

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/datos" className="btn btn-primary">Ver dataset completo</Link>
          <Link to="/aportaciones" className="btn btn-accent">Realizar aportación</Link>
        </div>
      </div>
    </div>
  )
}
