import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ContainerPage } from './components/ContainerPage/ContainerPage'
import { Navigation } from './components/Navigation/Navigation'
import { HeaderPage } from './components/HeaderPage/HeaderPage'

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage').then(({ HomePage: page }) => ({
    default: page,
  }))
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage/AboutPage').then(({ AboutPage: page }) => ({
    default: page,
  }))
)
const SkillsPage = lazy(() =>
  import('./pages/SkillsPage/SkillsPage').then(({ SkillsPage: page }) => ({
    default: page,
  }))
)
const ExperiencePage = lazy(() =>
  import('./pages/ExperiencePage/ExperiencePage').then(
    ({ ExperiencePage: page }) => ({ default: page })
  )
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage/ContactPage').then(({ ContactPage: page }) => ({
    default: page,
  }))
)

const PageFallback = () => (
  <div
    className='flex min-h-64 w-full max-w-[52rem] items-center justify-center'
    role='status'
    aria-live='polite'
  >
    <span className='h-9 w-9 animate-spin rounded-full border-2 border-fuchsia-300/20 border-t-fuchsia-300' />
    <span className='sr-only'>Cargando página</span>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ContainerPage>
        <HeaderPage />
        <Navigation />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/' element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/about-me' element={<AboutPage />} />
            <Route path='/skills' element={<SkillsPage />} />
            <Route path='/experience' element={<ExperiencePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </Routes>
        </Suspense>
      </ContainerPage>
    </BrowserRouter>
  )
}

export default App
