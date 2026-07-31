import { useTranslation } from 'react-i18next'
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiMapPin,
  FiServer,
} from 'react-icons/fi'

export const AboutPage = () => {
  const [t] = useTranslation('global')

  const focusAreas = [
    {
      icon: <FiCode />,
      title: t('header.about.focus.frontend.title'),
      text: t('header.about.focus.frontend.text'),
    },
    {
      icon: <FiServer />,
      title: t('header.about.focus.experience.title'),
      text: t('header.about.focus.experience.text'),
    },
    {
      icon: <FiDatabase />,
      title: t('header.about.focus.learning.title'),
      text: t('header.about.focus.learning.text'),
    },
  ]

  return (
    <section className='portfolio-page portfolio-page--about relative z-0 w-full max-w-[52rem] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-2xl shadow-purple-950/20 backdrop-blur-md dark:border-pink-100/10'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl'
      />

      <div className='portfolio-page-content about-main relative z-[1] grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:p-12'>
        <div className='flex flex-col justify-between gap-10'>
          <div className='animate-fadeInLR'>
            <div className='portfolio-page-eyebrow mb-6 flex items-center gap-3 font-[monospace] text-xs uppercase tracking-[0.28em] text-fuchsia-300'>
              <span className='h-px w-8 bg-fuchsia-400' />
              <span>{t('header.about.eyebrow')}</span>
            </div>
            <h2 className='portfolio-page-title max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl'>
              {t('header.about.title')}{' '}
              <span className='bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent'>
                {t('header.about.titleAccent')}
              </span>
            </h2>
            <div className='about-copy mt-7 max-w-xl space-y-5 text-base leading-7 text-slate-300 sm:text-lg'>
              <p>{t('header.about.intro')}</p>
              <p className='text-slate-400'>{t('header.about.body')}</p>
            </div>
          </div>

          <div className='grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-300 sm:flex sm:flex-wrap sm:items-center sm:gap-5'>
            <span className='flex items-center gap-2'>
              <FiMapPin className='text-fuchsia-400' />
              {t('header.about.location')}
            </span>
            <span className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50' />
              {t('header.about.availability')}
            </span>
          </div>
        </div>

        <div className='about-visual relative flex min-h-[22rem] items-center justify-center animate-fadeInRL lg:min-h-0'>
          <div className='absolute right-2 top-0 h-40 w-40 rounded-full border border-fuchsia-300/20 sm:right-8 sm:h-52 sm:w-52' />
          <div className='absolute bottom-2 left-3 h-24 w-24 rounded-full border border-violet-300/20 sm:left-8' />
          <div className='relative z-[1] w-[78%] max-w-[18rem] rotate-3 rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl shadow-fuchsia-950/50 backdrop-blur-sm transition-transform duration-500 hover:rotate-0'>
            <div
              role='img'
              aria-label={t('header.about.imageAlt')}
              className='about-main-image relative flex h-[19rem] w-full flex-col justify-between overflow-hidden rounded-xl bg-[radial-gradient(circle_at_75%_15%,rgba(217,70,239,.3),transparent_38%),linear-gradient(145deg,#111827,#17132e)] p-5'
            >
              <div className='flex items-center justify-between font-[monospace] text-[9px] uppercase tracking-[.18em] text-fuchsia-200'>
                <span>Product systems</span>
                <span className='h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50' />
              </div>
              <div className='relative mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-fuchsia-300/25 bg-fuchsia-400/10 text-5xl text-fuchsia-200 shadow-2xl shadow-fuchsia-950/60'>
                <FiCode />
                <span className='absolute -right-6 -top-6 h-14 w-14 rounded-full border border-violet-300/20' />
                <span className='absolute -bottom-7 -left-5 h-11 w-11 rounded-full bg-indigo-500/15' />
              </div>
              <div className='grid grid-cols-3 gap-2 font-[monospace] text-[8px] uppercase tracking-wider text-slate-300'>
                <span className='rounded-md border border-white/10 bg-white/5 py-2 text-center'>
                  Web
                </span>
                <span className='rounded-md border border-white/10 bg-white/5 py-2 text-center'>
                  Cloud
                </span>
                <span className='rounded-md border border-white/10 bg-white/5 py-2 text-center'>
                  Data
                </span>
              </div>
            </div>
            <div className='flex items-center justify-between px-1 pb-1 pt-3 text-xs text-slate-300'>
              <span>{t('header.about.cardLabel')}</span>
              <FiArrowUpRight className='text-fuchsia-300' />
            </div>
          </div>
          <div className='absolute bottom-5 left-0 z-[2] w-36 -rotate-6 rounded-xl border border-white/15 bg-slate-900/90 p-2 shadow-xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 sm:bottom-8 sm:left-4'>
            <div
              aria-hidden='true'
              className='flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 text-4xl text-violet-300'
            >
              <FiServer />
            </div>
            <p className='px-1 pb-1 text-center font-[monospace] text-[10px] uppercase tracking-widest text-violet-300'>
              {t('header.about.badge')}
            </p>
          </div>
        </div>
      </div>

      <div className='about-focus-grid relative z-[1] grid border-t border-white/10 bg-black/10 sm:grid-cols-3 dark:border-pink-100/10'>
        {focusAreas.map(({ icon, title, text }) => (
          <article
            className='about-focus-card group border-b border-white/10 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:p-7 sm:last:border-r-0 dark:border-pink-100/10'
            key={title}
          >
            <div className='about-focus-icon mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/10 text-xl text-fuchsia-300 transition-transform duration-300 group-hover:-translate-y-1'>
              {icon}
            </div>
            <h3 className='mb-2 font-[monospace] text-sm font-semibold uppercase tracking-wider text-white'>
              {title}
            </h3>
            <p className='about-focus-copy text-sm leading-6 text-slate-400'>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
