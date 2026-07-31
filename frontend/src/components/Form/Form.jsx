import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@react-hook/media-query'
import { FiArrowUpRight } from 'react-icons/fi'

const fieldStyles =
  'min-h-11 rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2.5 text-sm font-medium text-slate-100 outline-none transition placeholder:font-medium placeholder:text-slate-500 focus:border-fuchsia-400/70 focus:bg-slate-950/70 focus:ring-2 focus:ring-fuchsia-400/10 dark:border-pink-100/10 dark:focus:border-purple-500/70'

const labelStyles =
  'pb-2 font-[monospace] text-[10px] font-semibold uppercase tracking-[.16em] text-fuchsia-200'

export const Form = () => {
  const [t] = useTranslation('global')
  const isResponsive = useMediaQuery('(max-width: 1024px)')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onBlur' })

  const toastOptions = {
    position: isResponsive ? 'top-right' : 'bottom-right',
    className: 'bg-[#101010] text-white dark:bg-[#282B30] dark:text-white',
  }

  const onSubmit = handleSubmit(async (data) => {
    const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = import.meta.env

    if (!VITE_SERVICE_ID || !VITE_TEMPLATE_ID || !VITE_PUBLIC_KEY) {
      toast.error(t('header.contact.form.configurationError'), toastOptions)
      return
    }

    try {
      const payload = {
        ...data,
        message: `${data.message}\n\nTel\u00e9fono: ${data.user_phone}`,
      }

      await emailjs.send(
        VITE_SERVICE_ID,
        VITE_TEMPLATE_ID,
        payload,
        VITE_PUBLIC_KEY
      )

      toast.success(t('header.contact.form.success'), toastOptions)
      reset()
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      toast.error(t('header.contact.form.failure'), toastOptions)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className='contact-form relative z-[1] grid w-full max-w-none grid-cols-1 gap-x-3 gap-y-0 rounded-2xl border border-white/10 bg-slate-900/55 p-4 text-slate-300 shadow-xl shadow-purple-950/10 backdrop-blur-sm animate-fadeInBT sm:grid-cols-2 max-lg:animate-fadeInBTFormLg'
    >
      <div className='mb-2 flex items-end justify-between gap-4 sm:col-span-2'>
        <div>
          <span className='font-[monospace] text-[10px] uppercase tracking-[.22em] text-fuchsia-300'>
            {t('header.contact.form.kicker')}
          </span>
          <p className='mt-1.5 text-sm font-semibold text-white'>
            {t('header.contact.form.helper')}
          </p>
        </div>
        <span className='hidden h-9 w-9 items-center justify-center rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 text-lg text-fuchsia-200 sm:flex'>
          <FiArrowUpRight />
        </span>
      </div>

      <section className='flex flex-col'>
        <label htmlFor='user_name' className={labelStyles}>
          {t('header.contact.form.section1.label')}
        </label>
        <input
          id='user_name'
          {...register('user_name', { required: true })}
          type='text'
          autoComplete='name'
          aria-invalid={Boolean(errors.user_name)}
          placeholder={t('header.contact.form.section1.input_place_holder')}
          className={fieldStyles}
        />
        <span className='min-h-5 py-1 text-xs text-red-400'>
          {errors.user_name && t('header.contact.form.section1.error')}
        </span>
      </section>

      <section className='flex flex-col'>
        <label htmlFor='user_phone' className={labelStyles}>
          {t('header.contact.form.section2.label')}
        </label>
        <input
          id='user_phone'
          {...register('user_phone', {
            required: true,
            pattern: {
              value: /^\d{9}$/,
              message: t('header.contact.form.section2.error'),
            },
          })}
          type='tel'
          inputMode='numeric'
          maxLength={9}
          autoComplete='tel'
          aria-invalid={Boolean(errors.user_phone)}
          placeholder={t('header.contact.form.section2.input_place_holder')}
          className={fieldStyles}
        />
        <span className='min-h-5 py-1 text-xs text-red-400'>
          {errors.user_phone &&
            (errors.user_phone.message || t('header.contact.form.section2.error'))}
        </span>
      </section>

      <section className='flex flex-col sm:col-span-2'>
        <label htmlFor='user_email' className={labelStyles}>
          {t('header.contact.form.section3.label')}
        </label>
        <input
          id='user_email'
          {...register('user_email', {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('header.contact.form.section3.error'),
            },
          })}
          type='email'
          autoComplete='email'
          aria-invalid={Boolean(errors.user_email)}
          placeholder={t('header.contact.form.section3.input_place_holder')}
          className={fieldStyles}
        />
        <span className='min-h-5 py-1 text-xs text-red-400'>
          {errors.user_email &&
            (errors.user_email.message || t('header.contact.form.section3.error'))}
        </span>
      </section>

      <section className='flex flex-col sm:col-span-2'>
        <label htmlFor='message' className={labelStyles}>
          {t('header.contact.form.section4.label')}
        </label>
        <textarea
          id='message'
          {...register('message', { required: true })}
          rows='4'
          aria-invalid={Boolean(errors.message)}
          placeholder={t('header.contact.form.section4.input_place_holder')}
          className={`${fieldStyles} min-h-[6rem] resize-y`}
        />
        <span className='min-h-5 py-1 text-xs text-red-400'>
          {errors.message && t('header.contact.form.section4.error')}
        </span>
      </section>

      <div className='flex items-center justify-end pt-1 sm:col-span-2'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex min-w-[8rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-fuchsia-500 hover:to-violet-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting
            ? t('header.contact.form.sending')
            : t('header.contact.form.btn_send')}
          {!isSubmitting && <FiArrowUpRight />}
        </button>
      </div>
    </form>
  )
}
