import { useLanguage } from '../i18n/LanguageContext'
import { MesobArt, JebenaArt } from './Illustrations'
import ScrollMesob from './ScrollMesob'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section id="top" className="container hero">
      <div className="hero__text">
        <p className="eyebrow eyebrow--line">{t.hero.eyebrow}</p>
        <h1 className="hero__title">
          {t.hero.titleA}<span className="gold">{t.hero.titleB}</span>
        </h1>
        <p className="hero__lead">{t.hero.text}</p>
        <div className="btn-row">
          <a className="btn btn--gold" href="#menu">{t.hero.ctaFood}</a>
          <a className="btn btn--outline-light" href="#drinks">{t.hero.ctaDrinks}</a>
        </div>
      </div>
      <div className="hero__art">
        <div className="hero__circle" aria-hidden="true" />
        <div className="hero__circle hero__circle--inner" aria-hidden="true" />
        <MesobArt label={t.hero.altMesob} />
        <JebenaArt label={t.hero.altJebena} />
      </div>
    </section>
  )
}

export function Story() {
  const { t } = useLanguage()
  return (
    <section id="story" className="section section--light">
      <div className="container split">
        <div className="stack">
          <p className="eyebrow eyebrow--red">{t.story.eyebrow}</p>
          <h2 className="h2 pre-line">{t.story.title}</h2>
          <ScrollMesob variant="mobile" />
          <ScrollMesob variant="desktop" />
        </div>
        <div className="stack body-lg muted-dark">
          <p>{t.story.p1}</p>
          <p>{t.story.p2}</p>
          <div className="mini-cards">
            {t.story.cards.map((c) => (
              <div key={c.title} className="mini-card">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Coffee() {
  const { t } = useLanguage()
  return (
    <section id="coffee" className="section">
      <div className="container stack-xl">
        <div className="section-head">
          <div className="stack section-head__text">
            <p className="eyebrow">
              {t.coffee.eyebrow} · <span lang="am" className="geez">ቡና</span>
            </p>
            <h2 className="h2">{t.coffee.title}</h2>
            <p className="body-lg muted-light">{t.coffee.text}</p>
          </div>
        </div>

        <ol className="steps">
          {t.coffee.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="info-bar">
          {t.coffee.info.map((row) => (
            <span key={row.label}><strong>{row.label}</strong> {row.value}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  const { t } = useLanguage()
  return (
    <section id="visit" className="section section--light">
      <div className="container split">
        <div className="stack">
          <p className="eyebrow eyebrow--red">{t.visit.eyebrow}</p>
          <h2 className="h2 pre-line">{t.visit.title}</h2>
          <p className="body-lg muted-dark">{t.visit.text}</p>
          <div className="btn-row">
            {/* Replace with your number, e.g. href="tel:+49301234567" */}
            <a className="btn btn--dark" href="tel:">{t.visit.call}</a>
          </div>
        </div>
        <div className="visit-cards">
          {t.visit.cards.map((c) => (
            <div key={c.label} className="visit-card">
              <h3>{c.label}</h3>
              <p className="pre-line">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="brand__name">MESOB</span>
          <span className="brand__geez" lang="am">መሶብ</span>
          <span className="footer__tag">{t.footer.tagline}</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="#menu">{t.nav.menu}</a>
          <a href="#drinks">{t.nav.drinks}</a>
          <a href="#coffee">{t.nav.coffee}</a>
          <a href="#visit">{t.nav.visit}</a>
          <a href="impressum.html">{t.footer.imprint}</a>
          <a href="datenschutz.html">{t.footer.privacy}</a>
          {/* Add your Instagram link */}
          <a href="#top">Instagram</a>
        </nav>
      </div>
      <p className="container footer__copy">© {new Date().getFullYear()} Mesob</p>
    </footer>
  )
}
