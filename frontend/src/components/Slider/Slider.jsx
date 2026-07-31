import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../Card/Card'
import { useSkills } from '../../hooks/useSkills'
import { getSkillIcon } from './skillIcons'

const categories = [
  'all',
  'frontend',
  'cms',
  'backend',
  'cloud',
  'data',
  'tools',
  'workflow',
]

export const Slider = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [t] = useTranslation('global')
  const { skills, error, isLoading, retry } = useSkills()

  const cards = useMemo(
    () =>
      skills.map(({ id, name, categories: categoryKeys, icon }) => ({
        id,
        title: name,
        category: categoryKeys
          .map((category) => t(`header.skills.categories.${category}`))
          .join(' · '),
        categoryKeys,
        icon: getSkillIcon(icon),
      })),
    [skills, t]
  )

  const visibleCards = useMemo(
    () =>
      activeCategory === 'all'
        ? cards
        : cards.filter(({ categoryKeys }) =>
            categoryKeys.includes(activeCategory)
          ),
    [activeCategory, cards]
  )

  return (
    <div className='relative z-[1] animate-fadeInBT'>
      <div className='flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-pink-100/10'>
        <div>
          <p className='font-[monospace] text-[10px] uppercase tracking-[.22em] text-fuchsia-300'>
            {t('header.skills.collectionLabel')}
          </p>
          <h3 className='mt-2 text-xl font-semibold text-white sm:text-2xl'>
            {t('header.skills.collectionTitle')}
          </h3>
        </div>
        <span className='font-[monospace] text-xs uppercase tracking-widest text-slate-500'>
          {isLoading ? '—' : cards.length} {t('header.skills.skillsCount')}
        </span>
      </div>

      <div
        className='mt-5 flex flex-wrap gap-2'
        role='tablist'
        aria-label={t('header.skills.filterLabel')}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category
          const label =
            category === 'all'
              ? t('header.skills.all')
              : t(`header.skills.categories.${category}`)

          return (
            <button
              type='button'
              role='tab'
              aria-selected={isActive}
              key={category}
              onClick={() => setActiveCategory(category)}
              disabled={isLoading || Boolean(error)}
              className={`rounded-full border px-3 py-2 font-[monospace] text-[10px] uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? 'border-fuchsia-300 bg-fuchsia-400/15 text-fuchsia-100 shadow-lg shadow-fuchsia-950/20' : 'border-white/10 bg-white/[.03] text-slate-400 hover:border-fuchsia-300/40 hover:text-fuchsia-100'}`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div
        className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'
        aria-live='polite'
      >
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <div
              aria-hidden='true'
              className='min-h-[6.25rem] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-4'
              key={index}
            >
              <div className='flex items-center gap-3'>
                <div className='h-12 w-12 rounded-xl bg-white/[0.07]' />
                <div className='flex-1 space-y-3'>
                  <div className='h-2 w-2/5 rounded bg-white/[0.07]' />
                  <div className='h-4 w-3/5 rounded bg-white/[0.08]' />
                </div>
              </div>
            </div>
          ))}

        {!isLoading && error && (
          <div
            className='col-span-full flex min-h-44 flex-col items-center justify-center rounded-2xl border border-red-300/15 bg-red-500/[0.06] p-6 text-center'
            role='alert'
          >
            <p className='max-w-md text-sm text-slate-300'>
              {t('header.skills.loadError')}
            </p>
            <button
              type='button'
              onClick={retry}
              className='mt-4 rounded-full border border-fuchsia-300/40 bg-fuchsia-400/10 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20'
            >
              {t('header.skills.retry')}
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          visibleCards.map(({ id, title, category, icon }) => (
            <Card key={id} title={title} category={category} icon={icon} />
          ))}

        {!isLoading && !error && visibleCards.length === 0 && (
          <p className='col-span-full py-12 text-center text-sm text-slate-400'>
            {t('header.skills.empty')}
          </p>
        )}
      </div>

      <div className='mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 dark:border-pink-100/10'>
        <span className='text-xs text-slate-500'>
          {isLoading
            ? t('header.skills.loading')
            : t('header.skills.coreLabel')}
        </span>
        <span className='font-[monospace] text-xs tracking-widest text-fuchsia-200'>
          {isLoading || error
            ? '— / —'
            : `${visibleCards.length} / ${cards.length}`}
        </span>
      </div>
    </div>
  )
}
