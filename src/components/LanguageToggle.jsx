import { useLanguage } from '../i18n/LanguageContext'

// Sliding DE / EN switch. The gold knob slides under the active language.
export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage()
  const isEn = lang === 'en'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={`${t.lang.label}: ${isEn ? t.lang.en : t.lang.de}`}
      className={`lang-toggle${isEn ? ' is-en' : ''}`}
      onClick={toggle}
    >
      <span className="lang-toggle__knob" aria-hidden="true" />
      <span className="lang-toggle__opt" aria-hidden="true">DE</span>
      <span className="lang-toggle__opt" aria-hidden="true">EN</span>
    </button>
  )
}
