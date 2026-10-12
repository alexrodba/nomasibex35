import React from 'react'
import { getDictionary } from '../i18n'

const TagBadge = ({ tag, locale }) => {
  const t = getDictionary(locale)
  return <span className={`tag tag-${tag}`}>{t.tags[tag] || tag}</span>
}

export const TagList = ({ tags = [], affiliate = false, locale }) => (
  <ul className="tags" aria-label="Etiquetas">
    {tags.map((tag) => (
      <li key={tag}>
        <TagBadge tag={tag} locale={locale} />
      </li>
    ))}
    {affiliate && (
      <li>
        <TagBadge tag="afiliado" locale={locale} />
      </li>
    )}
  </ul>
)

export default TagBadge
