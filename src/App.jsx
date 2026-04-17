import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Introduccion = lazy(() => import('./pages/Introduccion'))
const DiagnosticoGlobal = lazy(() => import('./pages/DiagnosticoGlobal'))
const OEList = lazy(() => import('./pages/OEList'))
const OEDetail = lazy(() => import('./pages/OEDetail'))
const Conclusiones = lazy(() => import('./pages/Conclusiones'))
const Retos = lazy(() => import('./pages/Retos'))
const Dataset = lazy(() => import('./pages/Dataset'))
const Participacion = lazy(() => import('./pages/Participacion'))
const PlanAccion = lazy(() => import('./pages/PlanAccion'))
const CuadroMando = lazy(() => import('./pages/CuadroMando'))
// Legacy routes kept alive
const Aportaciones = lazy(() => import('./pages/Participacion'))
const Propuestas = lazy(() => import('./pages/Propuestas'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
      Cargando…
    </div>
  )
}

const S = (C) => <Suspense fallback={<PageLoader />}><C /></Suspense>

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={S(Home)} />
          <Route path="introduccion" element={S(Introduccion)} />
          <Route path="diagnostico" element={S(DiagnosticoGlobal)} />
          <Route path="objetivos" element={S(OEList)} />
          <Route path="objetivos/:id" element={S(OEDetail)} />
          <Route path="conclusiones" element={S(Conclusiones)} />
          <Route path="retos" element={S(Retos)} />
          <Route path="datos" element={S(Dataset)} />
          <Route path="participacion" element={S(Participacion)} />
          <Route path="aportaciones" element={S(Aportaciones)} />
          <Route path="plan-accion" element={S(PlanAccion)} />
          <Route path="cuadro-mando" element={S(CuadroMando)} />
          <Route path="propuestas" element={S(Propuestas)} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
