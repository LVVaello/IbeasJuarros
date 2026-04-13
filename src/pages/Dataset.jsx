import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import indicadores from '../data/indicadores.json'
import oes from '../data/oes.json'
import municipio from '../data/municipio.json'
import Breadcrumb from '../components/Breadcrumb'

const stats = municipio.resumen_estadistico
const GRUPOS = stats.grupos_tematicos ?? []
const PER_PAGE = 25

const COLS = [
  { key: 'oe_principal', label: 'OE', width: 60 },
  { key: 'grupo_tematico', label: 'Grupo', width: 150 },
  { key: 'bloque', label: 'Bloque', width: 180 },
  { key: 'indicador', label: 'Indicador', width: 240 },
  { key: 'valor_ibeas', label: 'Ibeas', width: 90, align: 'right' },
  { key: 'valor_espana', label: 'Ref. España', width: 90, align: 'right' },
  { key: 'unidad', label: 'Unidad', width: 80 },
  { key: 'disponibilidad', label: 'Estado', width: 120 },
  { key: 'fuente', label: 'Fuente', width: 200 },
]

export default function Dataset() {
  const [search, setSearch] = useState('')
  const [filterOE, setFilterOE] = useState('')
  const [filterGrupo, setFilterGrupo] = useState('')
  const [filterDisp, setFilterDisp] = useState('')
  const [sortField, setSortField] = useState('oe_principal')
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const [visibleCols, setVisibleCols] = useState(new Set(COLS.map(c => c.key)))

  const filtered = useMemo(() => {
    let d = indicadores
    if (search) {
      const q = search.toLowerCase()
      d = d.filter(r =>
        r.indicador?.toLowerCase().includes(q) ||
        r.bloque?.toLowerCase().includes(q) ||
        r.grupo_tematico?.toLowerCase().includes(q) ||
        r.fuente?.toLowerCase().includes(q)
      )
    }
    if (filterOE) d = d.filter(r => String(r.oe_principal) === filterOE)
    if (filterGrupo) d = d.filter(r => r.grupo_tematico === filterGrupo)
    if (filterDisp === 'disponible') d = d.filter(r => r.disponible)
    if (filterDisp === 'no_disponible') d = d.filter(r => !r.disponible)

    return [...d].sort((a, b) => {
      const av = a[sortField] ?? ''
      const bv = b[sortField] ?? ''
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      const cmp = String(av).localeCompare(String(bv), 'es')
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [search, filterOE, filterGrupo, filterDisp, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  function toggleSort(field) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  function resetAll() {
    setSearch(''); setFilterOE(''); setFilterGrupo(''); setFilterDisp(''); setPage(1)
  }

  function exportCSV() {
    const headers = COLS.filter(c => visibleCols.has(c.key)).map(c => c.label)
    const rows = filtered.map(r =>
      COLS.filter(c => visibleCols.has(c.key)).map(c => {
        const v = r[c.key]
        if (v === null || v === undefined) return ''
        return String(v).includes(',') ? `"${v}"` : String(v)
      })
    )
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ibeas-juarros-indicadores-${filterOE ? `OE${filterOE}-` : ''}${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeFilters = [search, filterOE, filterGrupo, filterDisp].filter(Boolean).length

  return (
    <div className="page-content">
      <div className="container" style={{ maxWidth: '100%', padding: '0 var(--space-md)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <Breadcrumb items={[{ label: 'Visor de datos' }]} />
        </div>

        {/* Header */}
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto var(--space-xl)' }}>
          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <h1 className="section-title">Visor de datos</h1>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Dataset completo · {stats.total_indicadores} indicadores · {stats.disponibles} con dato municipal
              </p>
            </div>
            <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={exportCSV}>
                ↓ Exportar CSV {activeFilters > 0 ? `(${filtered.length} filas)` : ''}
              </button>
              <Link to="/objetivos" className="btn btn-outline btn-sm">Ver por OE</Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto var(--space-lg)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 'var(--space-md)',
          }}>
            {[
              { v: indicadores.length, l: 'Total', c: 'var(--color-primary)' },
              { v: indicadores.filter(d => d.disponible).length, l: 'Disponibles', c: '#2e7d32' },
              { v: indicadores.filter(d => !d.disponible).length, l: 'Sin dato', c: 'var(--color-unavailable)' },
              { v: filtered.length, l: activeFilters > 0 ? 'Filtrados' : 'Mostrados', c: activeFilters > 0 ? 'var(--color-partial)' : 'var(--color-text-muted)' },
            ].map(s => (
              <div key={s.l} className="stat-card" style={{ padding: 'var(--space-md)' }}>
                <div className="stat-value" style={{ color: s.c, fontSize: '1.5rem' }}>{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div className="filter-bar">
            <div className="filter-group" style={{ flex: 2, minWidth: 200 }}>
              <label>Buscar texto</label>
              <input
                type="search"
                placeholder="Indicador, bloque, fuente…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <div className="filter-group">
              <label>Objetivo Estratégico</label>
              <select value={filterOE} onChange={e => { setFilterOE(e.target.value); setPage(1) }}>
                <option value="">Todos los OE</option>
                {oes.map(o => (
                  <option key={o.id} value={String(o.id)}>{o.abreviatura} · {o.titulo_corto}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Grupo temático</label>
              <select value={filterGrupo} onChange={e => { setFilterGrupo(e.target.value); setPage(1) }}>
                <option value="">Todos</option>
                {GRUPOS.map(g => <option key={g} value={g}>{g}</option>)}
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
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={resetAll}>
                Limpiar {activeFilters > 0 ? `(${activeFilters})` : ''}
              </button>
            </div>
          </div>

          {/* Count row */}
          <div style={{ marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <span>
              <strong style={{ color: 'var(--color-text)' }}>{filtered.length}</strong> registros
              {activeFilters > 0 && <span> · {activeFilters} filtro{activeFilters > 1 ? 's' : ''} activo{activeFilters > 1 ? 's' : ''}</span>}
              {filtered.length !== indicadores.length && (
                <button onClick={resetAll} style={{ marginLeft: 8, background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', padding: 0 }}>
                  Quitar filtros
                </button>
              )}
            </span>
            <span>Página {currentPage} de {totalPages}</span>
          </div>

          {/* Table */}
          <div className="data-table-wrapper" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table className="data-table" style={{ minWidth: 900 }}>
              <thead>
                <tr>
                  <th onClick={() => toggleSort('oe_principal')} className={sortField === 'oe_principal' ? `sorted-${sortDir}` : ''} style={{ width: 70 }}>OE</th>
                  <th onClick={() => toggleSort('grupo_tematico')} className={sortField === 'grupo_tematico' ? `sorted-${sortDir}` : ''} style={{ minWidth: 150 }}>Grupo</th>
                  <th onClick={() => toggleSort('bloque')} className={`${sortField === 'bloque' ? `sorted-${sortDir}` : ''} hide-mobile`} style={{ minWidth: 160 }}>Bloque</th>
                  <th onClick={() => toggleSort('indicador')} className={sortField === 'indicador' ? `sorted-${sortDir}` : ''} style={{ minWidth: 220 }}>Indicador</th>
                  <th onClick={() => toggleSort('valor_ibeas')} className={sortField === 'valor_ibeas' ? `sorted-${sortDir}` : ''} style={{ width: 100, textAlign: 'right' }}>Ibeas</th>
                  <th style={{ width: 100, textAlign: 'right' }} className="hide-mobile">Ref. España</th>
                  <th style={{ width: 80 }} className="hide-mobile">Unidad</th>
                  <th onClick={() => toggleSort('disponibilidad')} className={sortField === 'disponibilidad' ? `sorted-${sortDir}` : ''} style={{ width: 110 }}>Estado</th>
                  <th style={{ width: 180 }} className="hide-mobile">Fuente</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map(row => {
                  const oe = oes.find(o => o.id === row.oe_principal)
                  return (
                    <tr key={row.id}>
                      <td>
                        {oe && (
                          <Link to={`/objetivos/${oe.id}`} style={{ textDecoration: 'none' }}>
                            <span className="badge" style={{ background: oe.color, color: 'white', fontSize: '0.68rem' }}>
                              {oe.abreviatura}
                            </span>
                          </Link>
                        )}
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{row.grupo_tematico}</td>
                      <td className="hide-mobile" style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{row.bloque}</td>
                      <td style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {row.indicador}
                        {row.observaciones && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: 1, fontStyle: 'italic' }}>
                            {row.observaciones}
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {row.disponible ? (
                          <span className="valor-cell" style={{ fontSize: '0.875rem' }}>{formatNum(row.valor_ibeas)}</span>
                        ) : (
                          <span className="na-cell" style={{ fontSize: '0.8rem' }}>—</span>
                        )}
                      </td>
                      <td className="hide-mobile" style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {row.valor_espana != null ? formatNum(row.valor_espana) : <span style={{ color: 'var(--color-border)' }}>—</span>}
                      </td>
                      <td className="hide-mobile" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{row.unidad ?? ''}</td>
                      <td>
                        <span className={`badge ${row.disponible ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
                          {row.disponible ? 'Disponible' : 'Sin dato'}
                        </span>
                      </td>
                      <td className="hide-mobile" style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', maxWidth: 180 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={row.fuente ?? ''}>
                          {row.fuente ?? ''}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      No hay registros con los filtros actuales.{' '}
                      <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit' }}>
                        Quitar filtros
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setPage(1)}>«</button>
              <button disabled={currentPage === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {getPaginationRange(currentPage, totalPages).map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'var(--color-text-muted)' }}>…</span>
                ) : (
                  <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                )
              )}
              <button disabled={currentPage === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
              <button disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}>»</button>
            </div>
          )}

          <hr className="divider" />

          {/* Fuentes */}
          <section>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)' }}>Fuentes de datos</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              {(stats.fuentes ?? []).map((f, i) => (
                <span key={i} className="badge badge-light" style={{ fontSize: '0.72rem' }}>
                  {f.replace('Fuente : ', '')}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function formatNum(val) {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return val.toLocaleString('es')
    return val.toLocaleString('es', { maximumFractionDigits: 2 })
  }
  return String(val)
}

function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '…', total)
  } else if (current >= total - 3) {
    pages.push(1, '…', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '…', current - 1, current, current + 1, '…', total)
  }
  return pages
}
