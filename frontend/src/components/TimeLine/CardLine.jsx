import { useState } from 'react'

/* eslint-disable react/prop-types */

export const CardLine = ({ urlImg, altImg, title, visual, onclick }) => {
  const [imageFailed, setImageFailed] = useState(false)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onclick()
    }
  }

  return (
    <button
      type='button'
      className='group relative h-32 w-full max-w-[18rem] cursor-pointer overflow-hidden rounded-xl border border-fuchsia-400/50 bg-slate-900/80 text-left shadow-lg shadow-purple-950/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-fuchsia-950/40 active:scale-[.98] sm:h-36'
      onClick={onclick}
      onKeyDown={handleKeyDown}
      aria-label={`${title}. ${visual}`}
    >
      {urlImg && !imageFailed ? (
        <img
          src={urlImg}
          loading='lazy'
          decoding='async'
          className='absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-80'
          alt={altImg || title}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(232,121,249,.32),transparent_42%),linear-gradient(135deg,#17132e,#101827)]'>
          <span className='absolute right-3 top-12 font-[monospace] text-[9px] uppercase tracking-[.18em] text-fuchsia-200/70'>
            {visual}
          </span>
        </div>
      )}
      <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent' />
      <span className='absolute left-3 top-3 rounded-full border border-fuchsia-300/30 bg-slate-950/60 px-2 py-1 font-[monospace] text-[9px] tracking-[.16em] text-fuchsia-200'>
        {visual}
      </span>
      <span className='absolute bottom-3 left-3 right-3 font-[monospace] text-sm font-semibold text-white sm:text-base'>
        {title}
      </span>
    </button>
  )
}
