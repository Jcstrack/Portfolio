import { useTranslation } from 'react-i18next'
import clinicImage from '../../assets/imgs/experience/clinic.svg'
import kunicImage from '../../assets/imgs/experience/kunic.svg'
import fitnessImage from '../../assets/imgs/experience/fitness.svg'
import btgImage from '../../assets/imgs/experience/btg.svg'
import demodayImage from '../../assets/imgs/demoday.jfif'
import vidrieriaImage from '../../assets/imgs/vidrieria.jpg'

export const useExperienceData = () => {
  const [t] = useTranslation('global')
  const experience = (key, url) => ({
    title: t(`header.experience.${key}.title`),
    shortTitle: t(`header.experience.${key}.shortTitle`),
    date: t(`header.experience.${key}.date`),
    visual: t(`header.experience.${key}.visual`),
    skills: t(`header.experience.${key}.skills`, { returnObjects: true }),
    url,
    description: <p>{t(`header.experience.${key}.description`)}</p>,
  })

  return [
    experience('clinic', clinicImage),
    experience('kunic', kunicImage),
    experience('fitness', fitnessImage),
    experience('btg', btgImage),
    experience('network', vidrieriaImage),
    experience('fireWarning', demodayImage),
  ]
}
