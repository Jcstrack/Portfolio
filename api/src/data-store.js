import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const skillsFile = fileURLToPath(new URL('../data/skills.json', import.meta.url))
const contentFile = fileURLToPath(new URL('../data/content.json', import.meta.url))

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'))

export const getSkills = () => {
  const skills = readJson(skillsFile)

  if (!Array.isArray(skills)) {
    throw new TypeError('data/skills.json debe contener un arreglo.')
  }

  return skills
}

export const getLocalizedContent = (language = 'es') => {
  const content = readJson(contentFile)
  const selectedLanguage = Object.hasOwn(content, language) ? language : 'es'

  return {
    language: selectedLanguage,
    content: content[selectedLanguage],
    supportedLanguages: Object.keys(content),
  }
}
