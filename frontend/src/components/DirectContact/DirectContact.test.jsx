import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DirectContact } from './DirectContact'

const translations = {
  'header.contact.email': 'juanculloacampos@gmail.com',
  'header.contact.whatsapp.message':
    'Hola Juan Carlos, tengo una consulta sobre tus servicios.',
  'header.contact.direct.emailSubject': 'Consulta desde el portfolio',
  'header.contact.direct.whatsapp': 'Consultar por WhatsApp',
  'header.contact.direct.whatsappValue': 'Respuesta directa por mensaje',
  'header.contact.direct.email': 'Enviar un correo',
  'header.contact.direct.phone': 'Llamar por teléfono',
  'header.contact.direct.phoneValue': '+56 9 9484 0087',
  'header.contact.direct.linkedin': 'Contactar por LinkedIn',
  'header.contact.direct.linkedinValue': 'Perfil profesional',
  'header.contact.direct.kicker': 'Contacto directo',
  'header.contact.direct.title': 'Elige el canal que prefieras',
  'header.contact.direct.intro': 'No necesitas completar un formulario.',
}

vi.mock('react-i18next', () => ({
  useTranslation: () => [(key) => translations[key] || key],
}))

describe('DirectContact', () => {
  it('builds the WhatsApp link with the configured phone and message', () => {
    render(<DirectContact phoneNumber='+56 9 9484 0087' />)

    expect(
      screen.getByRole('link', { name: /consultar por whatsapp/i })
    ).toHaveAttribute(
      'href',
      'https://wa.me/56994840087?text=Hola%20Juan%20Carlos%2C%20tengo%20una%20consulta%20sobre%20tus%20servicios.'
    )
  })

  it('offers working email, phone and LinkedIn destinations', () => {
    render(<DirectContact phoneNumber='56994840087' />)

    expect(
      screen.getByRole('link', { name: /enviar un correo/i })
    ).toHaveAttribute(
      'href',
      'mailto:juanculloacampos@gmail.com?subject=Consulta%20desde%20el%20portfolio'
    )
    expect(
      screen.getByRole('link', { name: /llamar por teléfono/i })
    ).toHaveAttribute('href', 'tel:+56994840087')
    expect(
      screen.getByRole('link', { name: /contactar por linkedin/i })
    ).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/juan-carlos-ulloa-campos-34815a248/'
    )
  })
})
