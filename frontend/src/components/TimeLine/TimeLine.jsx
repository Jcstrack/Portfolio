import { useState } from 'react'
import { CardLine } from './CardLine'
import { CardModal } from './CardModal'
import { useExperienceData } from './dataCard'

export const TimeLine = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const dataModals = useExperienceData()

  return (
    <div className='relative min-h-full px-0.5 sm:px-1'>
      <div className='timeline-axis absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 bg-fuchsia-400/20'>
        <span className='absolute inset-x-0 top-0 h-full animate-growth bg-gradient-to-b from-fuchsia-300 via-purple-500 to-fuchsia-400' />
      </div>

      <div className='relative flex min-h-full flex-col justify-around gap-8 py-5 sm:gap-10 sm:py-8'>
        {dataModals.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <article
              className='timeline-item relative grid min-h-[9.5rem] grid-cols-2 items-center max-sm:block'
              key={item.title}
            >
              <span
                className={`timeline-branch absolute top-1/2 h-px bg-fuchsia-400/70 ${isLeft ? 'timeline-branch-left' : 'timeline-branch-right'}`}
                style={{ animationDelay: `${0.35 + index * 0.18}s` }}
                aria-hidden='true'
              />
              <span className='timeline-node absolute left-1/2 top-1/2 z-[1] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fuchsia-200 bg-purple-700 shadow-lg shadow-fuchsia-500/40' />

              <div
                className={`timeline-card ${isLeft ? 'timeline-card-left col-start-1 justify-self-start text-left' : 'timeline-card-right col-start-2 justify-self-end text-right'} max-sm:col-auto max-sm:pl-10 max-sm:text-left`}
                style={{ animationDelay: `${0.55 + index * 0.18}s` }}
              >
                <p className='mb-2 font-[monospace] text-[10px] uppercase tracking-[.12em] text-fuchsia-200/80 sm:text-xs'>
                  {item.date}
                </p>
                <CardLine
                  onclick={() => setActiveIndex(index)}
                  title={item.shortTitle}
                  visual={item.visual}
                  urlImg={item.url}
                  altImg={item.title}
                />
              </div>
            </article>
          )
        })}
      </div>

      {dataModals.map((item, index) => (
        <CardModal
          key={item.title}
          showModal={activeIndex === index}
          onclick={() => setActiveIndex(null)}
          date={item.date}
          title={item.title}
          urlImg={item.url}
          altImg={item.title}
          visual={item.visual}
          skills={item.skills}
          description={item.description}
        />
      ))}
    </div>
  )
}
