import { Link } from 'react-router-dom'
import data from '../data/marco_estrategico.json'
import Breadcrumb from '../components/Breadcrumb'

export default function MarcoEstrategico() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Marco Estratégico' }]} />

        <div style={{ marginBottom: 'var(--space-2xl)', maxWidth: 720 }}>
          <h1 className="section-title">Marco Estratégico</h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: 0 }}>
            {data.intro}
          </p>
        </div>

        {/* Objetivo general */}
        <section className="section">
          <h2 className="section-title">Objetivo general</h2>
          <div className="narrativa-block" style={{ marginBottom: 'var(--space-lg)' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', lineHeight: 1.75, margin: 0 }}>
              {data.objetivo_general}
            </p>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, margin: 0 }}>
            {data.objetivo_general_largo}
          </p>
        </section>

        <hr className="divider" />

        {/* Desafíos estratégicos */}
        <section className="section">
          <h2 className="section-title">Desafíos estratégicos</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-xl)', maxWidth: 700 }}>
            Cinco grandes retos que estructuran el análisis integrado del municipio y orientan las prioridades de la Agenda Urbana.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {data.desafios.map(d => (
              <div key={d.id} style={{
                display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start',
                background: 'white', border: '1px solid var(--color-border)',
                borderLeft: `5px solid ${d.color}`,
                borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: d.color, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem',
                  flexShrink: 0, marginTop: 2,
                }}>
                  {d.id}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', fontWeight: 700, color: d.color }}>
                    {d.titulo}
                  </h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.55 }}>
                    {d.subtitulo}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                    {d.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Oportunidades estratégicas */}
        <section className="section">
          <h2 className="section-title">Oportunidades estratégicas</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-xl)', maxWidth: 700 }}>
            Cada desafío abre una oportunidad de transformación. Estas seis líneas representan el potencial de actuación identificado para el municipio.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {data.oportunidades.map((o, i) => (
              <div key={o.id} style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0,
                  }}>
                    {o.id}
                  </div>
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {o.area}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                  {o.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* Objetivos específicos */}
        <section className="section">
          <h2 className="section-title">Objetivos específicos</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-xl)', maxWidth: 700 }}>
            Diez objetivos concretos que traducen los desafíos en líneas de actuación priorizadas para la Agenda Urbana de Ibeas de Juarros.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
            {data.objetivos.map(obj => (
              <div key={obj.id} style={{
                display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start',
                padding: 'var(--space-lg)', background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--color-primary)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem',
                  flexShrink: 0, marginTop: 2,
                }}>
                  {obj.id}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.4 }}>
                    {obj.titulo}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                    {obj.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/participacion" className="btn btn-outline">← Participación ciudadana</Link>
          <Link to="/diagnostico" className="btn btn-outline">Ver diagnóstico</Link>
          <Link to="/objetivos" className="btn btn-primary">Objetivos Estratégicos →</Link>
        </div>
      </div>
    </div>
  )
}
