import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WhatsAppButton } from './WhatsAppButton'
import { createWhatsAppUrl } from './whatsappUrl'

vi.mock('react-i18next', () => ({
  useTranslation: () => [(key) => key],
}))

const renderButton = (props = {}) =>
  render(<WhatsAppButton {...props} />)

describe('WhatsAppButton', () => {
  it('normalizes the phone and encodes the message', () => {
    expect(createWhatsAppUrl('+56 9 9484 0087', 'Hola, ¿conversamos?')).toBe(
      'https://wa.me/56994840087?text=Hola%2C%20%C2%BFconversamos%3F'
    )
  })

  it('renders a responsive external link when configured', () => {
    renderButton({ phoneNumber: '+56 9 9484 0087', message: 'Hola' })

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://wa.me/56994840087?text=Hola')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.className).toContain('bottom-28')
    expect(link.className).toContain('lg:bottom-6')
  })

  it('does not render without a valid destination', () => {
    const { container } = renderButton({ phoneNumber: '' })
    expect(container).toBeEmptyDOMElement()
  })
})
