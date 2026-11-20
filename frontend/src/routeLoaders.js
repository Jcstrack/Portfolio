export const routeLoaders = {
  '/home': () => import('./pages/HomePage/HomePage'),
  '/about-me': () => import('./pages/AboutPage/AboutPage'),
  '/skills': () => import('./pages/SkillsPage/SkillsPage'),
  '/experience': () => import('./pages/ExperiencePage/ExperiencePage'),
  '/contact': () => import('./pages/ContactPage/ContactPage'),
}

export const preloadRoute = (path) => routeLoaders[path]?.()
