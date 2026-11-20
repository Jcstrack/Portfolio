import { Link, useLocation } from 'react-router-dom'
import {
  IoHome,
  IoPerson,
  IoMail,
  IoSchool,
  IoBriefcase,
} from 'react-icons/io5'
import { Tooltip } from '../Tooltip/Tooltip'
import { useTranslation } from 'react-i18next'
import { preloadRoute } from '../../routeLoaders'

export const Navigation = () => {
  const location = useLocation()
  const { pathname } = location
  const [t] = useTranslation('global')
  const obj = [
    {
      ico: <IoHome />,
      title: t('header.navigation.title.home'),
      url: '/home',
    },
    {
      ico: <IoPerson />,
      title: t('header.navigation.title.about'),
      url: '/about-me',
    },
    {
      ico: <IoSchool />,
      title: t('header.navigation.title.skills'),
      url: '/skills',
    },
    {
      ico: <IoBriefcase />,
      title: t('header.navigation.title.experience'),
      url: '/experience',
    },
    {
      ico: <IoMail />,
      title: t('header.navigation.title.contact'),
      url: '/contact',
    },
  ]

  return (
    <nav
      aria-label={t('header.navigation.label')}
      className='fixed z-20 flex w-[3.4rem] items-center justify-center rounded-full border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/30 transition-transform duration-200 ease-out max-lg:bottom-8 max-lg:w-[15rem] max-lg:scale-[.95] max-lg:animate-fadeInBTNav lg:right-12 lg:top-1/2 lg:h-max lg:min-h-[12.5rem] lg:-translate-y-1/2'
    >
      <ul className='z-10 flex w-full items-center justify-center gap-x-7 lg:flex-col lg:gap-y-7'>
        {obj.map(({ ico, title, url }) => (
          <li
            key={url}
            className='relative flex items-center justify-center '
          >
            <Tooltip content={title}>
              <Link
                to={url}
                aria-label={title}
                aria-current={url === pathname ? 'page' : undefined}
                onMouseEnter={() => preloadRoute(url)}
                onFocus={() => preloadRoute(url)}
                onTouchStart={() => preloadRoute(url)}
                className={`z-[4] transition-[transform,color] duration-200 ease-out ${url === pathname ? 'scale-[1.5] text-pink-100' : 'scale-[1.2] text-pink-100/50 hover:scale-[1.3] hover:text-pink-100/80'}`}
              >
                {ico}
              </Link>
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  )
}
