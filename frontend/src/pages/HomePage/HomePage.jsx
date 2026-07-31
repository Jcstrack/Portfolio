import { Cube } from '../../components/Cube/Cube'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const [t] = useTranslation('global')
  return (
    <section className='home-layout grid w-full max-w-[52rem] shrink-0 grid-cols-5 items-center max-lg:h-auto max-lg:w-full max-lg:content-center max-lg:grid-cols-3 max-lg:grid-rows-[auto_auto] max-lg:gap-8'>
      <div
        className={`
          col-span-3 animate-fadeInLR p-6 max-lg:row-span-1 max-lg:animate-fadeInBT sm:p-10 lg:p-[4.5rem]`}
      >
        <article className='flex h-full w-full flex-col justify-center gap-y-2 max-lg:items-center'>
          <h5
            className={` w-max animate-typewriter border-r-[3px] border-r-[#cb16cb] font-[monospace] text-4xl font-semibold tracking-[4.5px] text-[#cb16cb] max-lg:text-center max-lg:text-2xl `}
          >
            Juan Carlos Ulloa.
          </h5>
          <p className='text-justify text-xl text-white max-lg:text-center max-lg:text-lg max-lg:max-w-[35rem]'>
            {t('header.home.presentation')}
          </p>
          <div className='flex w-full items-center justify-center lg:justify-start  lg:pt-2'>
            <Link
              to={'/about-me'}
              className='my-2 max-w-max rounded-full bg-purple-700 px-3 py-2 font-semibold text-purple-100 transition-colors duration-700 ease-in-out   hover:bg-purple-800 dark:bg-purple-800 dark:hover:bg-purple-700 max-lg:translate-y-2'
            >
              {t('header.home.btnAbout')}
            </Link>
          </div>
        </article>
      </div>
      <div
        className={`col-span-2 flex animate-fadeInRL items-center justify-center max-lg:col-span-3 max-lg:row-span-1 max-lg:animate-fadeInBT`}
      >
        <div className='relative flex items-center justify-center '>
          <Cube />
        </div>
      </div>
    </section>
  )
}
