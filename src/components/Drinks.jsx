import { useLanguage } from '../i18n/LanguageContext'
import { drinks } from '../data/drinks'

const pick = (v, lang) => (typeof v === 'string' ? v : v?.[lang])

export default function Drinks() {
  const { lang, t } = useLanguage()

  return (
    <section id="drinks" className="section section--drinks">
      <div className="container stack-xl">
        <div className="section-head">
          <div className="stack section-head__text">
            <p className="eyebrow">{t.drinks.eyebrow}</p>
            <h2 className="h2">{t.drinks.title}</h2>
            <p className="body-lg muted-light">{t.drinks.text}</p>
          </div>
        </div>

        <div className="drink-groups">
          {drinks.map((group) => (
            <section key={group.id} className="drink-group" aria-labelledby={`drinks-${group.id}`}>
              <h3 id={`drinks-${group.id}`} className="drink-group__title">{pick(group.title, lang)}</h3>
              <ul className="drink-list">
                {group.items.map((item, i) => (
                  <li key={i} className="drink">
                    <div className="drink__head">
                      <span className="drink__name">
                        {pick(item.name, lang)}
                        {item.geez && <span className="drink__geez" lang="am">{item.geez}</span>}
                        {item.tag && <span className="drink__tag">{pick(item.tag, lang)}</span>}
                      </span>
                      <span className="drink__dots" aria-hidden="true" />
                      <span className="drink__price">{item.price}</span>
                    </div>
                    <p className="drink__desc">{pick(item.desc, lang)}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="drinks-note">{t.drinks.note}</p>
      </div>
    </section>
  )
}
