import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { IoIosClose } from 'react-icons/io'

/* eslint-disable react/prop-types */

export const CardModal = ({
  title,
  urlImg,
  altImg,
  visual,
  date,
  description,
  skills = [],
  showModal,
  onclick,
}) => {
  const dialogRef = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)
  const [t] = useTranslation('global')

  useEffect(() => {
    if (!showModal) return undefined

    const previousActiveElement = document.activeElement
    const scrollContainer = document.querySelector('main')
    const previousOverflowY = scrollContainer?.style.overflowY

    if (scrollContainer) scrollContainer.style.overflowY = 'hidden'
    dialogRef.current?.focus()

    const handleEscape = (event) => {
      if (event.key === 'Escape') onclick()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      if (scrollContainer) scrollContainer.style.overflowY = previousOverflowY || ''
      previousActiveElement?.focus?.()
    }
  }, [onclick, showModal])

  if (!showModal) return null

  const titleId = `experience-dialog-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  return createPortal(
    (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm animate-opacityModal sm:p-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onclick()
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className='experience-dialog relative flex w-full max-w-[38.5rem] flex-col overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-[#10131f] shadow-2xl shadow-black/60 outline-none animate-scaleOpen'
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='relative h-60 shrink-0 overflow-hidden sm:h-72'>
          <button
            type='button'
            className='absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/60 text-2xl text-slate-100 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/20 hover:text-white'
            onClick={onclick}
            aria-label='Cerrar diálogo'
          >
            <IoIosClose />
          </button>

          {urlImg && !imageFailed ? (
            <img
              src={urlImg}
              alt={altImg || title}
              className='h-full w-full select-none object-cover'
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className='flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_25%_15%,rgba(232,121,249,.35),transparent_40%),linear-gradient(135deg,#17132e,#101827)] px-8 text-center'>
              <span className='font-[monospace] text-sm tracking-[.2em] text-fuchsia-200'>
                {visual}
              </span>
            </div>
          )}

          <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-5 pb-4 pt-14'>
            <h2
              id={titleId}
              className='max-w-[65%] font-[monospace] text-base leading-5 text-fuchsia-100 sm:text-xl'
            >
              {title}
            </h2>
            <span className='max-w-[35%] text-right font-[monospace] text-[10px] leading-4 text-slate-200 sm:text-xs'>
              {date}
            </span>
          </div>
        </div>

        <div className='scroll_modal min-h-0 flex-1 overflow-y-auto'>
          <article className='flex flex-col gap-y-3 px-5 py-5 text-justify text-sm leading-6 text-slate-300 sm:px-7 sm:text-base'>
            {description}
          </article>

          {skills.length > 0 && (
            <section className='border-t border-white/10 px-5 py-4 sm:px-7 dark:border-pink-100/10'>
              <h3 className='font-[monospace] text-[10px] uppercase tracking-[.2em] text-fuchsia-300'>
                {t('header.experience.skillsTitle')}
              </h3>
              <ul className='mt-3 flex flex-wrap gap-2' aria-label={t('header.experience.skillsTitle')}>
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className='rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1.5 font-[monospace] text-[10px] uppercase tracking-wider text-fuchsia-100'
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
    ),
    document.body
  )
}
