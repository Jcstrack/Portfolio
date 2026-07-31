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
  { side: 'front', Icon: SiReact, title: 'React.js', subtitle: 'Frontend' },
  { side: 'right', Icon: SiWordpress, title: 'WordPress', subtitle: 'CMS & Web' },
  { side: 'back', Icon: SiNodedotjs, title: 'Node.js', subtitle: 'Backend & APIs' },
  { side: 'left', Icon: SiPython, title: 'Python', subtitle: 'Data Science' },
  { side: 'top', Icon: SiDocker, title: 'Docker', subtitle: 'DevOps' },
  { side: 'bottom', Icon: SiTensorflow, title: 'TensorFlow', subtitle: 'AI & Data' },
]

export const Cube = () => {
  const [t] = useTranslation('global')

  return (
    <section className={style.container} aria-label={t('header.home.cubeAriaLabel')}>
      <div className={style.cube}>
        {faces.map(({ side, Icon, title, subtitle }) => (
          <div className={`${style.face} ${style[side]}`} key={side}>
            <Icon className={style.icon} aria-hidden='true' />
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
        ))}
        <span className={style.shadowBottom} aria-hidden='true' />
      </div>
    </section>
  )
}
