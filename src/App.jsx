import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const DiagnosticoGlobal = lazy(() => import('./pages/DiagnosticoGlobal'))
const OEList = lazy(() => import('./pages/OEList'))
const OEDetail = lazy(() => import('./pages/OEDetail'))
const Dataset = lazy(() => import('./pages/Dataset'))
const Aportaciones = lazy(() => import('./pages/Aportaciones'))
const Conclusiones = lazy(() => import('./pages/Conclusiones'))
const Retos = lazy(() => import('./pages/Retos'))
const Propuestas = lazy(() => import('./pages/Propuestas'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
      Cargando…
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="diagnostico" element={<Suspense fallback={<PageLoader />}><DiagnosticoGlobal /></Suspense>} />
          <Route path="objetivos" element={<Suspense fallback={<PageLoader />}><OEList /></Suspense>} />
          <Route path="objetivos/:id" element={<Suspense fallback={<PageLoader />}><OEDetail /></Suspense>} />
          <Route path="datos" element={<Suspense fallback={<PageLoader />}><Dataset /></Suspense>} />
          <Route path="aportaciones" element={<Suspense fallback={<PageLoader />}><Aportaciones /></Suspense>} />
          <Route path="conclusiones" element={<Suspense fallback={<PageLoader />}><Conclusiones /></Suspense>} />
          <Route path="retos" element={<Suspense fallback={<PageLoader />}><Retos /></Suspense>} />
          <Route path="propuestas" element={<Suspense fallback={<PageLoader />}><Propuestas /></Suspense>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
