import DOMPurify from 'dompurify'

export function cleanHTML(html) {
  return DOMPurify.sanitize(html || '')
}
