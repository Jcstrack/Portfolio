import { FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { createWhatsAppUrl } from './whatsappUrl'

/* eslint-disable react/prop-types */
export const WhatsAppButton = ({
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '56994840087',
  message,
}) => {
  const [t] = useTranslation('global')
  const resolvedMessage = message || t('header.contact.whatsapp.message')
  const href = createWhatsAppUrl(phoneNumber, resolvedMessage)

  if (!href) return null

  const label = t('header.contact.whatsapp.label')

  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      aria-label={label}
      title={label}
      className='fixed bottom-28 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500 text-3xl text-white shadow-xl shadow-emerald-950/35 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-emerald-950/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:translate-y-0 sm:right-6 lg:bottom-6 lg:right-6'
    >
      <FaWhatsapp aria-hidden='true' />
      <span className='sr-only'>{label}</span>
    </a>
  )
}
