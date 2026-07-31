/* eslint-disable react/prop-types */

export const ContainerPage = ({ children }) => {
  return (
    <main className='app-shell app-scroll relative z-0 flex min-h-0 w-full flex-col items-center overflow-x-hidden overflow-y-auto px-3 pb-28 pt-24 [scrollbar-gutter:stable] ease-in sm:px-5 lg:px-[10%] lg:pb-8 lg:pt-28'>
      {children}
    </main>
  )
}
