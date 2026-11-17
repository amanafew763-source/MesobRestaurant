import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { menu } from '../data/menu'

export default function Menu() {
  const { lang, t } = useLanguage()
  const [tab, setTab] = useState('veggie')
  const dishes = menu[tab]

  return (
    <section id="menu" className="section section--light">
      <div className="container stack-xl">
        <div className="section-head">
          <div className="stack section-head__text">
            <p className="eyebrow eyebrow--red">{t.menu.eyebrow}</p>
            <h2 className="h2">{t.menu.title}</h2>
            <p className="body-lg muted-dark">{t.menu.text}</p>
          </div>
          <div className="tabs" role="group" aria-label={t.menu.groupLabel}>
            {['veggie', 'meat'].map((key) => (
              <button
                key={key}
                type="button"
                className={`tab${tab === key ? ' is-active' : ''}`}
                aria-pressed={tab === key}
                onClick={() => setTab(key)}
              >
                {t.menu.tabs[key]}
              </button>
            ))}
          </div>
        </div>

        <p className="menu-note" aria-live="polite">{t.menu.notes[tab]}</p>

        <ul className="dishes" key={tab}>
          {dishes.map((d) => (
            <li key={d.name} className="dish">
              <div className="dish__head">
                <h3>{d.name}</h3>
                <span className="dish__price">{d.price}</span>
              </div>
              <span className="dish__geez" lang="am">{d.geez}</span>
              <p>{d.desc[lang]}</p>
              <div className="dish__tags">
                <span className="pill pill--green">{t.menu.tags[d.tag]}</span>
                <span className="pill pill--red">{t.menu.heat[d.heat]}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="combo">
          <div>
            <h3>{t.menu.comboTitle}</h3>
            <p>{t.menu.comboText}</p>
          </div>
          <span className="combo__price">{menu.combo.price}</span>
        </div>
      </div>
    </section>
  )
}
