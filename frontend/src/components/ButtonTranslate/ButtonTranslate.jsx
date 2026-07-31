import { useTranslation } from 'react-i18next'

const setCookie = (nombre, valor, dias) => {
  let fecha = new Date()
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000)
  let expira = 'expires=' + fecha.toUTCString()
  document.cookie = nombre + '=' + valor + ';' + expira + ';path=/'
}

export const ButtonTranslate = () => {
  const { i18n } = useTranslation('global')

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language)
    setCookie('idioma', language, 30)
  }

  return (
    <div
      className='flex items-center gap-x-2.5 text-white sm:pl-1'
      role='group'
      aria-label='Seleccionar idioma'
    >
      <button
        type='button'
        onClick={() => handleChangeLanguage('es')}
        aria-pressed={i18n.language === 'es'}
        aria-label='Español'
        className={`${i18n.language !== 'es' ? 'scale-90 opacity-70' : ''} flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xl transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuchsia-300`}
      >
        <span
          className='language-flag language-flag--es'
          aria-hidden='true'
        />
      </button>

      <button
        type='button'
        onClick={() => handleChangeLanguage('en')}
        aria-pressed={i18n.language === 'en'}
        aria-label='English'
        className={`${i18n.language !== 'en' ? 'scale-90 opacity-70' : ''} flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xl transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuchsia-300`}
      >
        <span
          className='language-flag language-flag--us'
          aria-hidden='true'
        />
      </button>
    </div>
  )
}
