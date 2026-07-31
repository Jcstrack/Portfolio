import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSkills } from '../../hooks/useSkills'
import { Slider } from './Slider'

vi.mock('../../hooks/useSkills', () => ({
  useSkills: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => [
    (key) =>
      ({
        'header.skills.collectionLabel': 'Skill inventory',
        'header.skills.collectionTitle': 'Tecnologías que utilizo',
        'header.skills.skillsCount': 'skills',
        'header.skills.filterLabel': 'Filtrar habilidades',
        'header.skills.all': 'Todas',
        'header.skills.categories.frontend': 'Frontend',
        'header.skills.categories.backend': 'Backend & APIs',
        'header.skills.categories.cms': 'WordPress & CMS',
        'header.skills.categories.cloud': 'Cloud & DevOps',
        'header.skills.categories.data': 'Datos & IA',
        'header.skills.categories.tools': 'Herramientas',
        'header.skills.categories.workflow': 'Productividad',
        'header.skills.loadError': 'No fue posible cargar las habilidades.',
        'header.skills.retry': 'Reintentar',
        'header.skills.empty': 'No hay habilidades.',
        'header.skills.loading': 'Cargando habilidades',
        'header.skills.coreLabel': 'Mostrando habilidades',
      })[key] || key,
  ],
}))

const skills = [
  {
    id: 'react',
    name: 'React.js',
    categories: ['frontend'],
    icon: 'FaReact',
  },
  {
    id: 'node',
    name: 'Node.js',
    categories: ['backend'],
    icon: 'FaNodeJs',
  },
]

describe('Skills inventory', () => {
  beforeEach(() => {
    useSkills.mockReturnValue({
      skills,
      error: null,
      isLoading: false,
      retry: vi.fn(),
    })
  })

  it('renders every skill returned by the API', () => {
    render(<Slider />)

    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
  })

  it('filters cards without requesting the API again', () => {
    render(<Slider />)

    fireEvent.click(screen.getByRole('tab', { name: 'Frontend' }))

    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('shows a recoverable error state', () => {
    const retry = vi.fn()
    useSkills.mockReturnValue({
      skills: [],
      error: new Error('offline'),
      isLoading: false,
      retry,
    })

    render(<Slider />)
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(retry).toHaveBeenCalledOnce()
  })
})
