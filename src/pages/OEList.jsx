import { Link } from 'react-router-dom'
import oes from '../data/oes.json'
import narrativa from '../data/narrativa.json'
import municipio from '../data/municipio.json'
import OECard from '../components/OECard'
import Breadcrumb from '../components/Breadcrumb'

const stats = municipio.resumen_estadistico

export default function OEList() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Objetivos Estratégicos' }]} />

        {/* Cabecera */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 className="section-title">Objetivos Estratégicos</h1>
          <p style={{ maxWidth: 720, color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
            La Agenda Urbana Española estructura el diagnóstico territorial en torno a diez Objetivos Estratégicos.
            Cada OE ofrece una lectura interpretada del territorio desde su ámbito específico: ordenación del suelo,
            demografía, cambio climático, movilidad, economía, vivienda y gobernanza.
          </p>
        </div>

        {/* Grid de OE */}
        <div className="grid grid-oe" style={{ marginBottom: 'var(--space-2xl)' }}>
          {oes.map(oe => {
            const oStats = stats.resumen_oe?.[String(oe.id)]
            const diagnosticoTeaser = narrativa.oe?.[String(oe.id)]?.diagnostico
            return (
              <OECardDiagnostico
                key={oe.id}
                oe={oe}
                teaser={diagnosticoTeaser}
                nConclusions={narrativa.oe?.[String(oe.id)]?.conclusiones?.length ?? 0}
                nRetos={narrativa.oe?.[String(oe.id)]?.retos?.length ?? 0}
              />
            )
          })}
        </div>

        <hr className="divider" />

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/diagnostico" className="btn btn-primary">Ver diagnóstico global</Link>
          <Link to="/datos" className="btn btn-outline">Visor de datos completo</Link>
          <Link to="/aportaciones" className="btn btn-accent">Realizar aportación</Link>
        </div>
      </div>
    </div>
  )
}

function OECardDiagnostico({ oe, teaser, nConclusions, nRetos }) {
  const firstSentence = teaser
    ? teaser.split(/(?<=\.)\s+/).slice(0, 2).join(' ')
    : null

  return (
    <Link
      to={`/objetivos/${oe.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      aria-label={`Ver diagnóstico de ${oe.abreviatura}: ${oe.titulo_corto}`}
    >
      <article
        style={{
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          border: `2px solid ${oe.color}22`,
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          height: '100%',
          transition: 'all var(--transition)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 6px 20px ${oe.color}30`
          e.currentTarget.style.borderColor = oe.color
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
          e.currentTarget.style.borderColor = `${oe.color}22`
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Cabecera */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span style={{
            display: 'inline-block',
            background: oe.color,
            color: 'white',
            borderRadius: 'var(--radius-full)',
            padding: '0.15rem 0.6rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            flexShrink: 0,
          }}>
            {oe.abreviatura}
          </span>
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.3,
            margin: 0,
          }}>
            {oe.titulo_corto}
          </h3>
        </div>

        {/* Teaser diagnóstico */}
        {firstSentence && (
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            flex: 1,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {firstSentence}
          </p>
        )}

        {/* Footer: conclusiones y retos disponibles */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 'var(--space-sm)',
          borderTop: `1px solid ${oe.color}20`,
          display: 'flex',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
        }}>
          {nConclusions > 0 && (
            <span style={{ fontSize: '0.7rem', color: oe.color, fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
              {nConclusions} conclusiones
            </span>
          )}
          {nRetos > 0 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              · {nRetos} retos
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
