/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeInRL: 'fadeInRL .65s ease-out ',
        fadeInLR: 'fadeInLR .65s ease-out ',
        fadeInBT: 'fadeInBT .65s ease-out ',
        fadeInBTFormLg: 'fadeInBTFormLg .65s ease-out forwards',
        fadeInBTNav: 'fadeInBTNav .65s ease-out ',
        typewriter:
          'typewriter 3s steps(18), effect .5s step-end infinite alternate',
        fadeInLRCard: 'fadeInLR .5s ease-out .4s forwards',
        fadeInRLCard: 'fadeInRL .5s ease-out 1s forwards',
        fadeInLRLastCard: 'fadeInLR .5s ease-out 1.6s forwards',
        growth: 'growth .8s linear forwards',
        opacity: 'opacity .8s linear forwards',
        opacityModal: 'opacity .3s ease-out forwards',
        opacityClosed: 'opacityClosed .3s ease-out forwards',
        scaleOpen: 'scaleOpen .3s ease-out forwards',
        scaleClosed: 'scaleClosed .3s ease-out forwards',
        scaleOpenLg: 'scaleOpenLg .3s ease-out forwards',
        scaleClosedLg: 'scaleClosedLg .3s ease-out forwards',
        growthFirstBranch: 'growthBranch .3s linear .1s forwards',
        growthSecondBranch: 'growthBranch .3s linear .5s forwards',
        growthThirdBranch: 'growthBranch .3s linear .9s forwards',
        fadeInBTFirstBranch: 'fadeInBT .3s linear .5s forwards',
        fadeInBTSecodBranch: 'fadeInBT .3s linear 1.3s forwards',
        fadeInBThirdBranch: 'fadeInBT .3s linear 2s forwards',
      },
      keyframes: {
        fadeInRL: {
          from: { opacity: '0', transform: 'translateX(50px) ' },
          to: { opacity: '1', transform: 'translateX(0) ' },
        },
        fadeInLR: {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInBT: {
          from: { opacity: '0', transform: 'translateY(-20px) ' },
          to: { opacity: '1', transform: 'translateX(0) ' },
        },
        fadeInBTFormLg: {
          from: { opacity: '0', transform: 'translateY(-20px) scale(1)' },
          to: { opacity: '1', transform: 'translateX(0) scale(.98)' },
        },
        fadeInBTNav: {
          from: { opacity: '0', transform: 'translateY(-20px) scale(1)' },
          to: { opacity: '1', transform: 'translateX(0) scale(.95)' },
        },
        typewriter: {
          from: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          to: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
        },
        effect: {
          '50%': {
            borderColor: 'transparent',
          },
        },
        growth: {
          from: { minHeight: '0%' },
          to: { minHeight: '100%' },
        },
        growthBranch: {
          from: {
            width: '0',
          },
          to: {
            width: '7rem',
          },
        },
        opacity: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        opacityClosed: {
          from: {
            opacity: '1',
            display: 'flex',
          },
          to: {
            opacity: '0',
            display: 'none',
          },
        },
        scaleOpen: {
          from: {
            transform: 'scale(0)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
        scaleClosed: {
          from: {
            transform: 'scale(1)',
          },
          to: {
            transform: 'scale(0)',
          },
        },
        scaleOpenLg: {
          from: {
            transform: 'scale(0)',
          },
          to: {
            transform: 'scale(.9)',
          },
        },
        scaleClosedLg: {
          from: {
            transform: 'scale(.9)',
          },
          to: {
            transform: 'scale(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
