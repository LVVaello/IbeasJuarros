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

        {/* Title */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 className="section-title">{global.diagnostico.titulo}</h1>
          <p style={{ maxWidth: 720, fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
            {global.presentacion}
          </p>
        </div>

        {/* Stats summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-2xl)',
        }}>
          {[
            { v: stats.total_indicadores, l: 'Indicadores', c: 'var(--color-primary)' },
            { v: stats.disponibles, l: 'Disponibles', c: '#2e7d32' },
            { v: stats.no_disponibles, l: 'Sin dato', c: 'var(--color-unavailable)' },
            { v: `${stats.tasa_disponibilidad_pct}%`, l: 'Disponibilidad', c: 'var(--color-partial)' },
          ].map(s => (
            <div key={s.l} className="stat-card">
              <div className="stat-value" style={{ color: s.c }}>{s.v}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Main diagnostic text */}
        <section className="section">
          <h2 className="section-title">Diagnóstico territorial</h2>
          <div className="narrativa-block">
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              {global.diagnostico.texto}
            </p>
          </div>

          {/* Bloques temáticos */}
          {global.diagnostico.bloques?.length > 0 && (
            <div className="grid grid-2" style={{ marginTop: 'var(--space-lg)' }}>
              {global.diagnostico.bloques.map((b, i) => (
                <div key={i} className="card">
                  <div className="card-body">
                    <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' }}>{b.titulo}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.7 }}>{b.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Grupos temáticos */}
        <section className="section">
          <h2 className="section-title">Grupos temáticos</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            {stats.grupos_tematicos?.map(g => (
              <span key={g} className="badge badge-light" style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem' }}>
                {g}
              </span>
            ))}
          </div>
          <Link to="/datos" className="btn btn-outline btn-sm">Ver dataset por grupo temático →</Link>
        </section>

        {/* Indicadores por OE */}
        <section className="section">
          <h2 className="section-title">Datos por Objetivo Estratégico</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>OE</th>
                  <th>Título</th>
                  <th style={{ width: 80, textAlign: 'center' }}>Total</th>
                  <th style={{ width: 90, textAlign: 'center' }}>Disponibles</th>
                  <th style={{ width: 90, textAlign: 'center' }}>Sin dato</th>
                  <th style={{ width: 100, textAlign: 'center' }}>Disponib.</th>
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
                        <span className="badge" style={{ background: oe.color, color: 'white', fontSize: '0.72rem' }}>
                          {oe.abreviatura}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>{r?.titulo ?? oe.titulo_corto}</td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{r?.total ?? 0}</td>
                      <td style={{ textAlign: 'center', color: '#2e7d32', fontWeight: 600 }}>{r?.disponibles ?? 0}</td>
                      <td style={{ textAlign: 'center', color: 'var(--color-unavailable)', fontWeight: 600 }}>{r?.no_disponibles ?? 0}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <div style={{ width: 48, height: 4, background: `${oe.color}20`, borderRadius: 2 }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: oe.color, borderRadius: 2 }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: oe.color }}>{pct}%</span>
                        </div>
                      </td>
                      <td>
                        {r?.total > 0 && (
                          <Link to={`/objetivos/${oe.id}`} style={{ fontSize: '0.78rem', color: oe.color, fontWeight: 600, textDecoration: 'none' }}>
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
        </section>

        {/* Conclusiones */}
        <section className="section">
          <h2 className="section-title">Conclusiones principales</h2>
          <div className="narrativa-block">
            <ul className="narrativa-list">
              {global.conclusiones?.map(c => (
                <li key={c.id}>
                  <strong>{c.titulo}</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>{c.texto}</p>
                  {c.oe_relacionados?.length > 0 && (
                    <div style={{ marginTop: '0.35rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {c.oe_relacionados.map(id => {
                        const oe = oes.find(o => o.id === id)
                        return oe ? (
                          <Link key={id} to={`/objetivos/${id}`} style={{
                            display: 'inline-block',
                            padding: '0.1rem 0.4rem',
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

        {/* Retos */}
        <section className="section">
          <h2 className="section-title">Retos identificados</h2>
          <div className="narrativa-block">
            <ul className="narrativa-list">
              {global.retos?.map(r => (
                <li key={r.id}>
                  <strong>{r.titulo}</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>{r.texto}</p>
                  {r.oe_relacionados?.length > 0 && (
                    <div style={{ marginTop: '0.35rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {r.oe_relacionados.map(id => {
                        const oe = oes.find(o => o.id === id)
                        return oe ? (
                          <Link key={id} to={`/objetivos/${id}`} style={{
                            display: 'inline-block',
                            padding: '0.1rem 0.4rem',
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

        {/* Propuestas */}
        <section className="section">
          <h2 className="section-title">Propuestas</h2>
          {global.propuestas?.some(p => p.titulo.includes('Pendiente')) ? (
            <div className="alert alert-info">
              <strong>En elaboración.</strong> Las propuestas globales se construirán a partir del proceso participativo.
              Puedes{' '}
              <Link to="/aportaciones" style={{ color: 'inherit', fontWeight: 700 }}>enviar tu aportación aquí</Link>.
            </div>
          ) : (
            <div className="narrativa-block">
              <ul className="narrativa-list">
                {global.propuestas?.map(p => (
                  <li key={p.id}>
                    <strong>{p.titulo}</strong>
                    {p.prioridad && p.prioridad !== 'pendiente' && (
                      <span className={`badge badge-${p.prioridad === 'alta' ? 'danger' : 'warning'}`} style={{ marginLeft: 8, fontSize: '0.68rem' }}>
                        {p.prioridad}
                      </span>
                    )}
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>{p.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/objetivos" className="btn btn-primary">Explorar por OE</Link>
          <Link to="/datos" className="btn btn-outline">Ver dataset completo</Link>
          <Link to="/aportaciones" className="btn btn-accent">Realizar aportación</Link>
        </div>
      </div>
    </div>
  )
}
