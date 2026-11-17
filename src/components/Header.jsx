import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { MesobLogo } from './Illustrations'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    ['#story', t.nav.story],
    ['#coffee', t.nav.coffee],
    ['#menu', t.nav.menu],
    ['#drinks', t.nav.drinks],
    ['#guests', t.nav.guests],
    ['#visit', t.nav.visit],
  ]

  return (
    <header className="header">
      <nav className="container header__inner" aria-label={t.nav.label}>
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__logo"><MesobLogo /></span>
          <span className="brand__name">MESOB</span>
          <span className="brand__geez" lang="am">መሶብ</span>
        </a>

        <div className="header__right">
          <LanguageToggle />
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        <div id="site-nav" className={`nav-links${open ? ' is-open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#visit" className="btn btn--gold btn--sm" onClick={() => setOpen(false)}>{t.nav.reserve}</a>
        </div>
      </nav>
    </header>
  )
}
