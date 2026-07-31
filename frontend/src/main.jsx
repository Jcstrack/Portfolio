import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import global_es from './translations/es/global.json'
import global_en from './translations/en/global.json'

const getCookie = (nombre) => {
  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(nombre + '='))
      ?.split('=')[1] || ''
  )
}

//inicializamos i18 con algunas opciones, en este caso, se está deshabilitando el escape de valores en la interpolación(insertar valores dinamicos en strings).
i18next.init({
  interpolation: { escapeValue: false },
  lng: getCookie('idioma') || 'es',
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      console.error('Service worker registration failed:', error)
    })
  })
}
