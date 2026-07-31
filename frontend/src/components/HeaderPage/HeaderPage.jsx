import { IoLogoLinkedin } from 'react-icons/io5'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ButtonTheme } from '../ButtonTheme/ButtonTheme'
import { ButtonTranslate } from '../ButtonTranslate/ButtonTranslate'

export const HeaderPage = () => {
  const objRed = [
    {
      ico: <IoLogoLinkedin />,
      url: 'https://www.linkedin.com/in/juan-carlos-ulloa-campos-34815a248/',
      site: 'linkedin',
    },
    {
      ico: <FaGithub />,
      url: 'https://github.com/Jcstrack',
      site: 'github',
    },
  ]
  return (
    <header className='fixed left-0 right-2 top-0 z-10 flex h-[6.4rem] items-center justify-center bg-slate-950/5 px-5 backdrop-blur-sm transition-all duration-[.3s] ease-in sm:px-9 max-lg:h-20'>
      <nav
        aria-label='Enlaces principales y preferencias'
        className='flex w-full max-w-[54rem] items-center justify-between gap-5'
      >
        <h1 className='shrink-0 text-3xl font-semibold text-white transition-all duration-[.3s] ease-in sm:text-[2.5rem]'>
          <Link to='/'>
            JUDEV<span className='text-pink-400 dark:text-pink-500'>u.</span>
          </Link>
        </h1>
        <ul className='flex items-center gap-x-3.5 sm:gap-x-5'>
          {objRed.map(({ ico, url, site }, index) => (
            <li
              className={`${site === 'github' ? 'hover:text-yellow-500' : ''} ${site === 'linkedin' ? 'hover:text-blue-500' : ''} h-max w-max scale-[1.35] p-1 text-pink-100 duration-[.4s] ease-in-out hover:-translate-y-1 sm:scale-150`}
              key={index}
            >
              <a
                href={url}
                target='_blank'
                rel='noreferrer noopener'
                aria-label={site}
                className='h-full w-full'
              >
                {ico}
              </a>
            </li>
          ))}
          <ButtonTheme />
          <ButtonTranslate />
        </ul>
      </nav>
    </header>
  )
}
