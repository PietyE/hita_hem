import sanitizeHtml from 'sanitize-html'

export const sanitizeHtmlFromBack = (html) => {
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'span',
      'strong',
      'i',
      'b',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'li',
      'img',
    ],
    allowedAttributes: {
      a: ['href'],
      img: ['src', 'alt'],
    },
    selfClosing: [
      'img',
      'br',
      'hr',
      'area',
      'base',
      'basefont',
      'input',
      'link',
      'meta',
    ],
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  })
}
