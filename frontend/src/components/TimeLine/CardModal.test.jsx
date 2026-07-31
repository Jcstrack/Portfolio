import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CardModal } from './CardModal'

vi.mock('react-i18next', () => ({
  useTranslation: () => [
    (key) =>
      key === 'header.experience.skillsTitle'
        ? 'Habilidades utilizadas'
        : key,
  ],
}))

const modalProps = {
  title: 'Proyecto de prueba',
  visual: 'REACT - NODE',
  date: '2026',
  description: 'Descripción profesional del proyecto.',
  skills: ['React.js', 'Node.js'],
  showModal: true,
  onclick: vi.fn(),
}

describe('Experience dialog', () => {
  it('exposes dialog semantics and its skills', () => {
    render(<CardModal {...modalProps} />)

    expect(
      screen.getByRole('dialog', { name: 'Proyecto de prueba' })
    ).toBeInTheDocument()
    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('closes with the Escape key', () => {
    const onclick = vi.fn()
    render(<CardModal {...modalProps} onclick={onclick} />)

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onclick).toHaveBeenCalledOnce()
  })

  it('does not render when it is closed', () => {
    render(<CardModal {...modalProps} showModal={false} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
