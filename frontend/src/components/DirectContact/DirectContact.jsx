import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { createWhatsAppUrl } from '../WhatsAppButton/whatsappUrl'

const LINKEDIN_URL =
  'https://www.linkedin.com/in/juan-carlos-ulloa-campos-34815a248/'

/* eslint-disable react/prop-types */
export const DirectContact = ({
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '56994840087',
}) => {
  const [t] = useTranslation('global')
  const email = t('header.contact.email')
  const normalizedPhone = String(phoneNumber || '').replace(/\D/g, '')
  const whatsappUrl = createWhatsAppUrl(
    phoneNumber,
    t('header.contact.whatsapp.message')
  )
  const phoneUrl = normalizedPhone ? `tel:+${normalizedPhone}` : ''
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(
    t('header.contact.direct.emailSubject')
  )}`

  const channels = [
    whatsappUrl && {
      href: whatsappUrl,
      icon: FaWhatsapp,
      label: t('header.contact.direct.whatsapp'),
      value: t('header.contact.direct.whatsappValue'),
      external: true,
      accent: true,
    },
    {
      href: emailUrl,
      icon: FiMail,
      label: t('header.contact.direct.email'),
      value: email,
    },
    phoneUrl && {
      href: phoneUrl,
      icon: FiPhone,
      label: t('header.contact.direct.phone'),
      value: t('header.contact.direct.phoneValue'),
    },
    {
      href: LINKEDIN_URL,
      icon: FiLinkedin,
      label: t('header.contact.direct.linkedin'),
      value: t('header.contact.direct.linkedinValue'),
      external: true,
    },
  ].filter(Boolean)

  return (
    <div className='direct-contact relative z-[1] flex flex-col rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-black/10 dark:border-pink-100/10 sm:p-5'>
      <span className='font-[monospace] text-[10px] uppercase tracking-[.22em] text-fuchsia-300'>
        {t('header.contact.direct.kicker')}
      </span>
      <h3 className='mt-3 text-lg font-semibold text-white'>
        {t('header.contact.direct.title')}
      </h3>
      <p className='mt-2 text-sm leading-6 text-slate-300'>
        {t('header.contact.direct.intro')}
      </p>

      <div className='mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
        {channels.map(
          ({ href, icon: Icon, label, value, external, accent }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              className={`group flex min-h-16 items-center gap-3 rounded-xl border px-4 py-3 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 ${
                accent
                  ? 'border-emerald-300/25 bg-emerald-500/10 hover:border-emerald-300/50 hover:bg-emerald-500/15'
                  : 'border-white/10 bg-white/[.035] hover:border-fuchsia-300/30 hover:bg-fuchsia-500/[.07]'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl ${
                  accent
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-fuchsia-500/10 text-fuchsia-300'
                }`}
              >
                <Icon aria-hidden='true' />
              </span>
              <span className='min-w-0 flex-1'>
                <span className='block text-sm font-semibold text-white'>
                  {label}
                </span>
                <span className='mt-0.5 block truncate text-xs text-slate-400'>
                  {value}
                </span>
              </span>
              <FiArrowUpRight
                aria-hidden='true'
                className='shrink-0 text-slate-500 transition-colors group-hover:text-fuchsia-200'
              />
            </a>
          )
        )}
      </div>
    </div>
  )
}
