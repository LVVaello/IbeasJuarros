import { useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import oes from '../data/oes.json'
import porOE from '../data/por_oe.json'
import narrativa from '../data/narrativa.json'
import config from '../data/config.json'
import Breadcrumb from '../components/Breadcrumb'
import OEIcon from '../components/OEIcon'

const TABS = ['Diagnóstico', 'Conclusiones', 'Retos', 'Datos']

function buildFormUrl(oeId) {
  const { url_base_prefill, field_oe } = config.google_form
  if (!url_base_prefill || url_base_prefill.includes('PLACEHOLDER')) return config.google_form.url
  if (!field_oe || field_oe.includes('PENDIENTE')) return url_base_prefill
  return `${url_base_prefill}&${field_oe}=OE+${oeId}`
}

export default function OEDetail() {
  const { id } = useParams()
  const oeId = parseInt(id)
  const oe = oes.find(o => o.id === oeId)

  const [tab, setTab] = useState('Diagnóstico')
  const [search, setSearch] = useState('')
  const [filterGrupo, setFilterGrupo] = useState('')
  const [filterDisp, setFilterDisp] = useState('')
  const [filterVinculo, setFilterVinculo] = useState('')
  const [sortField, setSortField] = useState('bloque')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const PER_PAGE = 30

  if (!oe) return <Navigate to="/objetivos" replace />

  const rawData = porOE[String(oeId)] ?? []
  const nText = narrativa.oe?.[String(oeId)]

  const grupos = useMemo(() => [...new Set(rawData.map(d => d.grupo_tematico).filter(Boolean))].sort(), [rawData])

  const filtered = useMemo(() => {
    let d = rawData
    if (search) {
      const q = search.toLowerCase()
      d = d.filter(r =>
        r.indicador?.toLowerCase().includes(q) ||
        r.bloque?.toLowerCase().includes(q) ||
        r.grupo_tematico?.toLowerCase().includes(q)
      )
    }
    if (filterGrupo) d = d.filter(r => r.grupo_tematico === filterGrupo)
    if (filterDisp === 'disponible') d = d.filter(r => r.disponible)
    if (filterDisp === 'no_disponible') d = d.filter(r => !r.disponible)
    if (filterVinculo) d = d.filter(r => r.tipo_vinculo === filterVinculo)

    d = [...d].sort((a, b) => {
      const av = a[sortField] ?? ''
      const bv = b[sortField] ?? ''
      const cmp = String(av).localeCompare(String(bv), 'es')
      return sortDir === 'asc' ? cmp : -cmp
    })
    return d
  }, [rawData, search, filterGrupo, filterDisp, filterVinculo, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  function toggleSort(field) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  function resetFilters() {
    setSearch(''); setFilterGrupo(''); setFilterDisp(''); setFilterVinculo(''); setPage(1)
  }

  const dispStats = {
    total: rawData.length,
    disp: rawData.filter(d => d.disponible).length,
    ndisp: rawData.filter(d => !d.disponible).length,
  }
  const pct = dispStats.total > 0 ? Math.round(100 * dispStats.disp / dispStats.total) : 0

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumb items={[
          { to: '/objetivos', label: 'Objetivos Estratégicos' },
          { label: oe.abreviatura + ' · ' + oe.titulo_corto },
        ]} />

        {/* OE HEADER */}
        <div style={{
          background: `linear-gradient(135deg, ${oe.color} 0%, ${oe.color}cc 100%)`,
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-xl)',
          color: 'white',
          marginBottom: 'var(--space-xl)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: 24, top: 24, opacity: 0.15 }}>
            <OEIcon id={oe.id} color="white" size={100} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-md)', padding: 12 }}>
                <OEIcon id={oe.id} color="white" size={36} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-heading)', opacity: 0.8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {oe.abreviatura}
                </span>
                <h1 style={{ color: 'white', margin: 0, fontSize: 'clamp(1.2rem,3vw,1.75rem)' }}>
                  {oe.titulo}
                </h1>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 680, margin: '0 0 var(--space-lg)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {oe.descripcion}
            </p>

            {/* Stats inline */}
            <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1 }}>{dispStats.total}</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>indicadores</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>disponibles</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1 }}>{dispStats.ndisp}</div>
                <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>sin dato</div>
              </div>
            </div>

            {/* Form button */}
            <a
              href={buildFormUrl(oe.id)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1.1rem',
                background: 'white',
                color: oe.color,
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'all var(--transition)',
              }}
            >
              ✏️ Realizar aportación sobre este OE
            </a>
          </div>
        </div>

        {/* Navigation prev/next */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
          {oeId > 1 ? (
            <Link to={`/objetivos/${oeId - 1}`} className="btn btn-outline btn-sm">
              ← {oes.find(o => o.id === oeId - 1)?.abreviatura}
            </Link>
          ) : <div />}
          {oeId < 10 ? (
            <Link to={`/objetivos/${oeId + 1}`} className="btn btn-outline btn-sm">
              {oes.find(o => o.id === oeId + 1)?.abreviatura} →
            </Link>
          ) : <div />}
        </div>

        {/* TABS */}
        <div className="tabs no-print">
          {TABS.map(t => (
            <button
              key={t}
              className={`tab-btn${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
              style={tab === t ? { borderBottomColor: oe.color, color: oe.color } : {}}
            >
              {t}
              {t === 'Datos' && rawData.length > 0 && (
                <span className="badge badge-light" style={{ marginLeft: 4, fontSize: '0.68rem' }}>{rawData.length} ind.</span>
              )}
            </button>
          ))}
        </div>

        {/* TAB: DATOS */}
        {tab === 'Datos' && (
          <div>
            {rawData.length === 0 ? (
              <div className="alert alert-warning">
                <strong>Sin datos asignados a este OE</strong> en la matriz actual.
                Este objetivo es un vacío identificado que se abordará en fases posteriores.
              </div>
            ) : (
              <>
                {/* Filters */}
                <div className="filter-bar">
                  <div className="filter-group" style={{ flex: 2, minWidth: 200 }}>
                    <label>Buscar</label>
                    <input
                      type="search"
                      placeholder="Indicador, bloque…"
                      value={search}
                      onChange={e => { setSearch(e.target.value); setPage(1) }}
                    />
                  </div>
                  <div className="filter-group">
                    <label>Grupo temático</label>
                    <select value={filterGrupo} onChange={e => { setFilterGrupo(e.target.value); setPage(1) }}>
                      <option value="">Todos</option>
                      {grupos.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Disponibilidad</label>
                    <select value={filterDisp} onChange={e => { setFilterDisp(e.target.value); setPage(1) }}>
                      <option value="">Todos</option>
                      <option value="disponible">Disponible</option>
                      <option value="no_disponible">Sin dato</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Vínculo</label>
                    <select value={filterVinculo} onChange={e => { setFilterVinculo(e.target.value); setPage(1) }}>
                      <option value="">Todos</option>
                      <option value="principal">Principal</option>
                      <option value="relacionado">Relacionado</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <button className="btn btn-outline btn-sm" onClick={resetFilters}>Limpiar</button>
                  </div>
                </div>

                {/* Count */}
                <div style={{ marginBottom: 'var(--space-md)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  Mostrando <strong>{filtered.length}</strong> de <strong>{rawData.length}</strong> registros
                  {filtered.length !== rawData.length && (
                    <button onClick={resetFilters} style={{ marginLeft: 8, fontSize: '0.8rem', background: 'none', border: 'none', color: oe.color, cursor: 'pointer', textDecoration: 'underline' }}>
                      Quitar filtros
                    </button>
                  )}
                </div>

                {/* Table */}
                <div className="data-table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th onClick={() => toggleSort('grupo_tematico')} className={sortField === 'grupo_tematico' ? `sorted-${sortDir}` : ''} style={{ minWidth: 140 }}>
                          Grupo
                        </th>
                        <th onClick={() => toggleSort('bloque')} className={sortField === 'bloque' ? `sorted-${sortDir}` : ''} style={{ minWidth: 160 }}>
                          Bloque
                        </th>
                        <th onClick={() => toggleSort('indicador')} className={sortField === 'indicador' ? `sorted-${sortDir}` : ''} style={{ minWidth: 200 }}>
                          Indicador
                        </th>
                        <th onClick={() => toggleSort('valor_ibeas')} className={sortField === 'valor_ibeas' ? `sorted-${sortDir}` : ''} style={{ width: 110, textAlign: 'right' }}>
                          Ibeas
                        </th>
                        <th style={{ width: 110, textAlign: 'right' }} className="hide-mobile">
                          Ref. España
                        </th>
                        <th onClick={() => toggleSort('unidad')} className={`${sortField === 'unidad' ? `sorted-${sortDir}` : ''} hide-mobile`} style={{ width: 90 }}>
                          Unidad
                        </th>
                        <th style={{ width: 100 }}>
                          Estado
                        </th>
                        <th className="hide-mobile" style={{ width: 80 }}>Vínculo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map(row => (
                        <tr key={row.id}>
                          <td style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{row.grupo_tematico}</td>
                          <td style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{row.bloque}</td>
                          <td style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            {row.indicador}
                            {row.observaciones && (
                              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                                {row.observaciones}
                              </div>
                            )}
                          </td>
                          <td className={row.disponible ? 'valor-cell' : 'na-cell'} style={{ textAlign: 'right', fontSize: '0.875rem' }}>
                            {formatValue(row.valor_ibeas, row.disponible)}
                          </td>
                          <td className="hide-mobile" style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                            {row.valor_espana != null ? formatNum(row.valor_espana) : <span style={{ color: 'var(--color-border)' }}>—</span>}
                          </td>
                          <td className="hide-mobile" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{row.unidad ?? ''}</td>
                          <td>
                            <span className={`badge ${row.disponible ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.68rem' }}>
                              {row.disponible ? 'Disponible' : 'Sin dato'}
                            </span>
                          </td>
                          <td className="hide-mobile">
                            <span className="badge badge-light" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                              {row.tipo_vinculo ?? 'principal'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setPage(1)}>«</button>
                    <button disabled={currentPage === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const p = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i
                      return (
                        <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                      )
                    })}
                    <button disabled={currentPage === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                    <button disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}>»</button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 8 }}>
                      Página {currentPage} de {totalPages}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB: DIAGNÓSTICO */}
        {tab === 'Diagnóstico' && (
          <NarrativaTab
            titulo="Diagnóstico"
            contenido={nText?.diagnostico}
            placeholder="El diagnóstico de este OE está en elaboración. Puede editarse en src/data/narrativa.json bajo oe.{id}.diagnostico"
          />
        )}

        {/* TAB: CONCLUSIONES */}
        {tab === 'Conclusiones' && (
          <ListaTab
            titulo="Conclusiones"
            items={nText?.conclusiones}
            placeholder="Las conclusiones de este OE se añadirán próximamente en narrativa.json"
            color={oe.color}
          />
        )}

        {/* TAB: RETOS */}
        {tab === 'Retos' && (
          <ListaTab
            titulo="Retos"
            items={nText?.retos}
            placeholder="Los retos de este OE se añadirán próximamente en narrativa.json"
            color={oe.color}
          />
        )}

        <hr className="divider" />
        <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/objetivos" className="btn btn-outline">← Todos los OE</Link>
          <a href={buildFormUrl(oe.id)} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            ✏️ Aportar sobre {oe.abreviatura}
          </a>
          <Link to="/datos" className="btn btn-outline">Ver dataset completo</Link>
        </div>
      </div>
    </div>
  )
}

function NarrativaTab({ titulo, contenido, placeholder }) {
  if (!contenido) {
    return (
      <div className="narrativa-block">
        <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>{placeholder}</p>
      </div>
    )
  }
  return (
    <div className="narrativa-block">
      <p style={{ fontSize: '0.975rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', margin: 0 }}>
        {contenido}
      </p>
    </div>
  )
}

function ListaTab({ titulo, items, placeholder, color }) {
  if (!items || items.length === 0) {
    return (
      <div className="narrativa-block">
        <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
          {placeholder ?? 'Sin contenido por ahora. Editar en narrativa.json'}
        </p>
      </div>
    )
  }
  return (
    <div className="narrativa-block">
      <ul className="narrativa-list">
        {items.map((item, i) => (
          <li key={item.id ?? i}>
            <strong style={{ color: color ?? 'var(--color-primary)' }}>{item.titulo}</strong>
            {item.prioridad && item.prioridad !== 'pendiente' && (
              <span className={`badge badge-${item.prioridad === 'alta' ? 'danger' : 'warning'}`} style={{ marginLeft: 8, fontSize: '0.68rem' }}>
                {item.prioridad}
              </span>
            )}
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', lineHeight: 1.65 }}>
              {item.texto}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatValue(val, disponible) {
  if (!disponible || val === null || val === undefined) {
    return <span style={{ color: 'var(--color-border)' }}>—</span>
  }
  return formatNum(val)
}

function formatNum(val) {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return val.toLocaleString('es')
    return val.toLocaleString('es', { maximumFractionDigits: 2 })
  }
  return String(val)
}
