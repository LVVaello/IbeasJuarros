import { Link } from 'react-router-dom'
import narrativa from '../data/narrativa.json'
import municipio from '../data/municipio.json'
import oes from '../data/oes.json'
import Breadcrumb from '../components/Breadcrumb'

const stats = municipio.resumen_estadistico
const global = narrativa.global

export default function DiagnosticoGlobal() {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[{ label: 'Diagnóstico global' }]} />

        {/* SÍNTESIS MUNICIPAL */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
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
          <h1 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
            {global.diagnostico.titulo}
          </h1>
          <p style={{ maxWidth: 760, fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: 0 }}>
            {global.presentacion}
          </p>
        </div>

        {/* DIAGNÓSTICO GLOBAL */}
        <section className="section">
          <h2 className="section-title">Lectura diagnóstica del territorio</h2>
          <div className="narrativa-block">
            <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--color-text-secondary)', margin: 0 }}>
              {global.diagnostico.texto}
            </p>
          </div>

          {global.diagnostico.bloques?.length > 0 && (
            <div className="grid grid-2" style={{ marginTop: 'var(--space-lg)' }}>
              {global.diagnostico.bloques.map((b, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' }}>{b.titulo}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.75 }}>{b.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONCLUSIONES */}
        <section className="section">
          <h2 className="section-title">Conclusiones principales</h2>
          <div className="narrativa-block">
            <ul className="narrativa-list">
              {global.conclusiones?.map(c => (
                <li key={c.id}>
                  <strong>{c.titulo}</strong>
                  <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0', lineHeight: 1.7 }}>{c.texto}</p>
                  {c.oe_relacionados?.length > 0 && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {c.oe_relacionados.map(id => {
                        const oe = oes.find(o => o.id === id)
                        return oe ? (
                          <Link key={id} to={`/objetivos/${id}`} style={{
                            display: 'inline-block',
                            padding: '0.1rem 0.5rem',
                            background: oe.colorLight,
                            color: oe.color,
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}>
                            {oe.abreviatura}
                          </Link>
                        ) : null
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RETOS */}
        <section className="section">
          <h2 className="section-title">Retos identificados</h2>
          <div className="narrativa-block">
            <ul className="narrativa-list">
              {global.retos?.map(r => (
                <li key={r.id}>
                  <strong>{r.titulo}</strong>
                  <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0', lineHeight: 1.7 }}>{r.texto}</p>
                  {r.oe_relacionados?.length > 0 && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {r.oe_relacionados.map(id => {
                        const oe = oes.find(o => o.id === id)
                        return oe ? (
                          <Link key={id} to={`/objetivos/${id}`} style={{
                            display: 'inline-block',
                            padding: '0.1rem 0.5rem',
                            background: oe.colorLight,
                            color: oe.color,
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}>
                            {oe.abreviatura}
                          </Link>
                        ) : null
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROPUESTAS */}
        <section className="section">
          <h2 className="section-title">Propuestas</h2>
          {global.propuestas?.some(p => p.titulo?.includes('Pendiente')) ? (
            <div className="alert alert-info">
              <strong>En elaboración.</strong> Las propuestas globales se construirán a partir del proceso participativo.
              Puedes <Link to="/aportaciones" style={{ color: 'inherit', fontWeight: 700 }}>enviar tu aportación aquí</Link>.
            </div>
          ) : (
            <div className="narrativa-block">
              <ul className="narrativa-list">
                {global.propuestas?.map(p => (
                  <li key={p.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                      <strong>{p.titulo}</strong>
                      {p.prioridad && p.prioridad !== 'pendiente' && (
                        <span className={`badge badge-${p.prioridad === 'alta' ? 'danger' : 'warning'}`} style={{ fontSize: '0.68rem' }}>
                          {p.prioridad}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', margin: '0.3rem 0 0', lineHeight: 1.7 }}>{p.texto}</p>
                    {p.oe_relacionados?.length > 0 && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {p.oe_relacionados.map(id => {
                          const oe = oes.find(o => o.id === id)
                          return oe ? (
                            <Link key={id} to={`/objetivos/${id}`} style={{
                              display: 'inline-block',
                              padding: '0.1rem 0.5rem',
                              background: oe.colorLight,
                              color: oe.color,
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}>
                              {oe.abreviatura}
                            </Link>
                          ) : null
                        })}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <hr className="divider" />

        {/* ACCESO A OE */}
        <section className="section">
          <h2 className="section-title">Explorar por Objetivo Estratégico</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
            El diagnóstico se desglosa en los 10 Objetivos Estratégicos de la Agenda Urbana Española.
            Cada OE recoge la lectura territorial, conclusiones, retos y propuestas del ámbito correspondiente.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {oes.map(oe => (
              <Link
                key={oe.id}
                to={`/objetivos/${oe.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  background: oe.colorLight,
                  color: oe.color,
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  border: `1px solid ${oe.color}30`,
                  transition: 'all var(--transition)',
                }}
              >
                {oe.abreviatura}
              </Link>
            ))}
          </div>
        </section>

        {/* DATOS POR OE — apoyo técnico */}
        <section className="section">
          <h2 className="section-title" style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            Apoyo técnico: datos disponibles por Objetivo Estratégico
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            El diagnóstico se apoya en {stats.total_indicadores} indicadores procedentes de fuentes estadísticas oficiales.
            La tabla siguiente recoge el volumen de indicadores por OE.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>OE</th>
                  <th>Ámbito</th>
                  <th style={{ width: 70, textAlign: 'center' }}>Total</th>
                  <th style={{ width: 90, textAlign: 'center' }}>Disponibles</th>
                  <th style={{ width: 80 }}></th>
                </tr>
              </thead>
              <tbody>
                {oes.map(oe => {
                  const r = stats.resumen_oe?.[String(oe.id)]
                  const pct = r && r.total > 0 ? Math.round(100 * r.disponibles / r.total) : 0
                  return (
                    <tr key={oe.id}>
                      <td>
                        <span className="badge" style={{ background: oe.color, color: 'white', fontSize: '0.68rem' }}>
                          {oe.abreviatura}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>{r?.titulo ?? oe.titulo_corto}</td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{r?.total ?? 0}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <div style={{ width: 40, height: 3, background: `${oe.color}20`, borderRadius: 2 }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: oe.color, borderRadius: 2 }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: oe.color }}>{pct}%</span>
                        </div>
                      </td>
                      <td>
                        {r?.total > 0 && (
                          <Link to={`/objetivos/${oe.id}`} style={{ fontSize: '0.75rem', color: oe.color, fontWeight: 600, textDecoration: 'none' }}>
                            Ver →
                          </Link>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 'var(--space-md)' }}>
            <Link to="/datos" className="btn btn-outline btn-sm">Ver dataset completo →</Link>
          </div>
        </section>

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/objetivos" className="btn btn-primary">Explorar por OE</Link>
          <Link to="/datos" className="btn btn-outline">Visor de datos completo</Link>
          <Link to="/aportaciones" className="btn btn-accent">Realizar aportación</Link>
        </div>
      </div>
    </div>
  )
}
