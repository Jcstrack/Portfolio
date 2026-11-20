/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeInRL: 'fadeInRL .42s ease-out ',
        fadeInLR: 'fadeInLR .42s ease-out ',
        fadeInBT: 'fadeInBT .42s ease-out ',
        fadeInBTFormLg: 'fadeInBTFormLg .42s ease-out forwards',
        fadeInBTNav: 'fadeInBTNav .42s ease-out ',
        typewriter:
          'typewriter 1.8s steps(18), effect .6s step-end infinite alternate',
        fadeInLRCard: 'fadeInLR .5s ease-out .4s forwards',
        fadeInRLCard: 'fadeInRL .5s ease-out 1s forwards',
        fadeInLRLastCard: 'fadeInLR .5s ease-out 1.6s forwards',
        growth: 'growth .45s ease-out forwards',
        opacity: 'opacity .45s ease-out forwards',
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
      },
    },
  },
  plugins: [],
}
