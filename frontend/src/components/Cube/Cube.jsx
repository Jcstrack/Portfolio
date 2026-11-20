import { useTranslation } from 'react-i18next'
import {
  SiDocker,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTensorflow,
  SiWordpress,
} from 'react-icons/si'
import style from './style.module.css'

const faces = [
  { side: 'front', Icon: SiReact, title: 'React.js', subtitleKey: 'frontend' },
  { side: 'right', Icon: SiWordpress, title: 'WordPress', subtitleKey: 'cmsWeb' },
  { side: 'back', Icon: SiNodedotjs, title: 'Node.js', subtitleKey: 'backendApis' },
  { side: 'left', Icon: SiPython, title: 'Python', subtitleKey: 'dataScience' },
  { side: 'top', Icon: SiDocker, title: 'Docker', subtitleKey: 'devops' },
  { side: 'bottom', Icon: SiTensorflow, title: 'TensorFlow', subtitleKey: 'aiData' },
]

export const Cube = () => {
  const [t] = useTranslation('global')

  return (
    <section className={style.container} aria-label={t('header.home.cubeAriaLabel')}>
      <div className={style.cube}>
        {faces.map(({ side, Icon, title, subtitleKey }) => (
          <div className={`${style.face} ${style[side]}`} key={side}>
            <Icon className={style.icon} aria-hidden='true' />
            <strong>{title}</strong>
            <span>{t(`header.home.cube.${subtitleKey}`)}</span>
          </div>
        ))}
        <span className={style.shadowBottom} aria-hidden='true' />
      </div>
    </section>
  )
}
