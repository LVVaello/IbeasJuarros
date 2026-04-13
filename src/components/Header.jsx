import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', exact: true },
  { to: '/diagnostico', label: 'Diagnóstico' },
  { to: '/objetivos', label: 'Objetivos Estratégicos' },
  { to: '/datos', label: 'Visor de datos' },
  { to: '/aportaciones', label: 'Aportar' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logos */}
        <Link to="/" className="header-brand" aria-label="Inicio">
          <img
            src="assets/escudo-ibeas.png"
            alt="Escudo de Ibeas de Juarros"
            className="header-escudo"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="header-title-group">
            <span className="header-municipio">Ibeas de Juarros</span>
            <span className="header-subtitle">Diagnóstico · Agenda Urbana</span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="header-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                'header-link' + (isActive ? ' header-link--active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logo Agenda Urbana */}
        <div className="header-logo-au hide-mobile">
          <img
            src="assets/logo-agenda-urbana.png"
            alt="Agenda Urbana Española"
            style={{ height: 48, width: 'auto' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>

        {/* Mobile toggle */}
        <button
          className="header-menu-btn no-print"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="header-mobile-nav no-print" aria-label="Menú móvil">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                'header-mobile-link' + (isActive ? ' header-mobile-link--active' : '')
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
