/* eslint-disable react/prop-types */

export const Card = ({ title, category, icon }) => {
  return (
    <article
      className='group flex min-h-[6.25rem] min-w-0 items-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/[0.06]'
    >
      <div className='flex w-full min-w-0 items-center gap-3'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-2xl text-fuchsia-300/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-fuchsia-200 sm:h-12 sm:w-12 sm:text-3xl'>
          {icon}
        </div>
        <div className='min-w-0 flex-1'>
          <span className='block break-words font-[monospace] text-[9px] uppercase leading-4 tracking-[.1em] text-fuchsia-300/70'>
            {category}
          </span>
          <h3 className='mt-1 break-words text-sm font-semibold leading-snug text-white sm:text-base'>
            {title}
          </h3>
        </div>
      </div>
    </article>
  )
}
