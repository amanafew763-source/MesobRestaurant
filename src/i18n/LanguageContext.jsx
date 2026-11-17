import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'mesob-lang'
const DEFAULT_LANG = 'de'

const LanguageContext = createContext(null)

function readStoredLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'de' ? saved : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang)
  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable — the choice just isn't remembered */
    }
  }, [lang, t])

  const toggle = () => setLang((l) => (l === 'de' ? 'en' : 'de'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
