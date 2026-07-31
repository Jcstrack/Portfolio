import { useTranslation } from 'react-i18next'
import { TimeLine } from '../../components/TimeLine/TimeLine'

export const ExperiencePage = () => {
  const [t] = useTranslation('global')

  return (
    <section className='portfolio-page relative z-0 w-full max-w-[52rem] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-2xl shadow-purple-950/20 backdrop-blur-md dark:border-pink-100/10'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl'
      />

      <div className='portfolio-page-content relative z-[1] p-6 sm:p-8 lg:p-12'>
        <div className='portfolio-page-eyebrow mb-6 flex items-center gap-3 font-[monospace] text-xs uppercase tracking-[0.28em] text-fuchsia-300 animate-fadeInLR'>
          <span className='h-px w-8 bg-fuchsia-400' />
          <span>02 / {t('header.experience.title')}</span>
        </div>
        <div className='flex items-end justify-between gap-6'>
          <h2 className='portfolio-page-title text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
            {t('header.experience.title')}
          </h2>
          <span className='hidden max-w-[16rem] text-right font-[monospace] text-xs uppercase tracking-widest text-slate-500 sm:block'>
            {t('header.experience.tagline')}
          </span>
        </div>

        <p className='max-w-3xl text-sm leading-6 text-slate-400 sm:text-base'>
          {t('header.experience.intro')}
        </p>

        <div className='relative mt-8 min-h-[44rem] rounded-2xl border border-white/10 bg-black/10 p-3 animate-fadeInBT sm:min-h-[48rem] sm:p-6 dark:border-pink-100/10'>
          <TimeLine />
        </div>
      </div>
    </section>
  )
}
