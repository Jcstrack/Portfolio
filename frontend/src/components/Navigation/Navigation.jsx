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
      className='fixed z-20 flex w-[3.4rem] items-center justify-center rounded-full bg-pink-100/20 p-6 backdrop-blur-md transition-transform duration-[.2s] ease-in max-lg:bottom-8 max-lg:w-[15rem] max-lg:scale-[.95] max-lg:animate-fadeInBTNav max-lg:transition-all lg:right-12 lg:top-1/2 lg:h-max lg:min-h-[12.5rem] lg:-translate-y-1/2'
    >
      <ul className='z-10 flex w-full items-center justify-center gap-x-7 lg:flex-col lg:gap-y-7'>
        {obj?.map(({ ico, title, url }, index) => (
          <li
            key={index}
            className='relative flex items-center justify-center '
          >
            <Tooltip content={title}>
              <Link
                to={url}
                aria-label={title}
                aria-current={url === pathname ? 'page' : undefined}
                className={`z-[4] transition-all duration-300 ease-in-out ${url === pathname ? 'scale-[1.5] text-pink-100' : 'scale-[1.2] text-pink-100/50 hover:scale-[1.3] hover:text-pink-100/80'}`}
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
