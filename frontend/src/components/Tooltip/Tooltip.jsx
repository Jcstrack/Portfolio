/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'

export const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false)
  const divRef = useRef(null)

  const handleHover = () => {
    setShow(true)
  }

  const handleHoverChild = () => setShow(false)

  const handleOnClick = () => setShow(false)

  const handleLeave = () => {
    setShow(false)
  }

  return (
    <>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleOnClick}
        className='relative flex items-center'
      >
        {children}
      </div>

      <div
        ref={divRef}
        onMouseEnter={handleHoverChild}
        className={`${show ? 'opacity-100 delay-[.3s]  max-lg:-translate-y-3 lg:-translate-x-3' : 'opacity-0 max-lg:translate-y-0 lg:translate-x-0'} after:content-[" "] absolute flex w-max  select-none items-center justify-center  rounded-md bg-pink-100 px-2 py-1 text-base font-medium text-purple-600 transition-all duration-200 ease-in after:absolute after:border-[10px]     after:border-b-0 after:border-l-black/0 after:border-r-black/0   after:border-t-pink-100 max-lg:bottom-10 after:max-lg:-bottom-[.6rem] lg:right-8  after:lg:-right-[.7rem] after:lg:-rotate-90 dark:bg-[#282B30] dark:text-purple-400 dark:after:border-t-[#282B30]`}
      >
        {content}
      </div>
    </>
  )
}
