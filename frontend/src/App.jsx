import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ContainerPage } from './components/ContainerPage/ContainerPage'
import { Navigation } from './components/Navigation/Navigation'
import { HeaderPage } from './components/HeaderPage/HeaderPage'
import { WhatsAppButton } from './components/WhatsAppButton/WhatsAppButton'
import { routeLoaders } from './routeLoaders'

const lazyPage = (path, exportName) =>
  lazy(() =>
    routeLoaders[path]().then((module) => ({ default: module[exportName] }))
  )

const HomePage = lazyPage('/home', 'HomePage')
const AboutPage = lazyPage('/about-me', 'AboutPage')
const SkillsPage = lazyPage('/skills', 'SkillsPage')
const ExperiencePage = lazyPage('/experience', 'ExperiencePage')
const ContactPage = lazyPage('/contact', 'ContactPage')

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
        <WhatsAppButton />
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
