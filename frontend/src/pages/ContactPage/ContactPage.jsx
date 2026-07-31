import { useTranslation } from 'react-i18next'
import { FiClock, FiMail, FiMapPin } from 'react-icons/fi'
import { Toaster } from 'react-hot-toast'
import { Form } from '../../components/Form/Form'

export const ContactPage = () => {
  const [t] = useTranslation('global')

  return (
    <>
      <section className='portfolio-page portfolio-page--contact relative z-0 w-full max-w-[48rem] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-2xl shadow-purple-950/20 backdrop-blur-md dark:border-pink-100/10'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl'
      />

      <div className='portfolio-page-content contact-content relative z-[1] p-5 sm:p-7 lg:p-8'>
        <div className='portfolio-page-eyebrow mb-4 flex items-center gap-3 font-[monospace] text-xs uppercase tracking-[0.28em] text-fuchsia-300 animate-fadeInLR'>
          <span className='h-px w-8 bg-fuchsia-400' />
          <span>03 / {t('header.contact.title')}</span>
        </div>
        <div className='flex items-end justify-between gap-6'>
          <h2 className='portfolio-page-title text-4xl font-semibold tracking-tight text-white'>
            {t('header.contact.title')}
          </h2>
          <span className='hidden font-[monospace] text-xs uppercase tracking-widest text-slate-500 sm:block'>
            Let&apos;s talk
          </span>
        </div>

        <div className='contact-panel relative mt-6 grid items-stretch gap-4 rounded-2xl border border-white/10 bg-black/10 p-3 animate-fadeInBT sm:p-4 lg:grid-cols-[.8fr_1.2fr] dark:border-pink-100/10'>
          <aside className='contact-aside flex flex-col justify-between rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/10 via-slate-950/20 to-indigo-500/10 p-4'>
            <div>
              <span className='font-[monospace] text-[10px] uppercase tracking-[.22em] text-fuchsia-300'>
                {t('header.contact.kicker')}
              </span>
              <p className='mt-4 text-base font-semibold leading-6 text-white'>
                {t('header.contact.intro')}
              </p>
            </div>

            <div className='mt-6 space-y-3 text-[13px] text-slate-300'>
              <a
                href={`mailto:${t('header.contact.email')}`}
                className='flex items-start gap-3 transition-colors hover:text-fuchsia-200'
              >
                <FiMail className='mt-1 shrink-0 text-fuchsia-300' />
                <span className='break-all'>{t('header.contact.email')}</span>
              </a>
              <span className='flex items-start gap-3'>
                <FiMapPin className='mt-1 shrink-0 text-fuchsia-300' />
                <span>{t('header.contact.location')}</span>
              </span>
              <span className='flex items-start gap-3'>
                <FiClock className='mt-1 shrink-0 text-fuchsia-300' />
                <span>{t('header.contact.response')}</span>
              </span>
            </div>
          </aside>

          <Form />
        </div>
      </div>
      </section>
      <Toaster />
    </>
  )
}
