import { useEffect, useState } from 'react'
import { IoSunny, IoMoonSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const getCookie = (nombre) => {
  return (
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(nombre + '='))
      ?.split('=')[1] || ''
  )
}

export const ButtonTheme = () => {
  const [t] = useTranslation('global')
  const [theme, setTheme] = useState(() => {
    const savedTheme = getCookie('theme')
    if (savedTheme) {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })
  useEffect(() => {
    setCookie('theme', theme, 365)
    document.querySelector('html').classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const label =
    theme === 'dark'
      ? t('header.ui.activateLightMode')
      : t('header.ui.activateDarkMode')

  return (
    <button
      type='button'
      onClick={handleChangeTheme}
      aria-label={label}
      title={label}
      className='relative z-[1] scale-[1.35] rounded-xl p-1 text-yellow-500 transition-[transform,color] duration-200 ease-out hover:text-yellow-600 dark:rotate-[360deg] dark:text-purple-300 dark:hover:text-purple-400 sm:scale-150'
    >
      {theme === 'dark' ? <IoMoonSharp /> : <IoSunny />}
    </button>
  )
}
