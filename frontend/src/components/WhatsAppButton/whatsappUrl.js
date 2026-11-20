export const createWhatsAppUrl = (phoneNumber, message) => {
  const normalizedPhone = String(phoneNumber || '').replace(/\D/g, '')

  if (normalizedPhone.length < 8) return ''

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}
