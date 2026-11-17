import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { guestPhotos } from '../data/guests'

const AUTOPLAY_MS = 6000
const PLACEHOLDER_TONES = ['#3A2A20', '#2F4A3A', '#5A2A1E', '#4A3A22', '#2A2F3F']

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function GuestCarousel() {
  const { lang, t } = useLanguage()
  const count = guestPhotos.length
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  const [hovered, setHovered] = useState(false)
  const [broken, setBroken] = useState({}) // images that failed to load
  const touchX = useRef(null)

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  // Autoplay (paused on hover/focus or when the user pauses it)
  useEffect(() => {
    if (!playing || hovered || count < 2) return
    const id = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [playing, hovered, next, count, index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  // Swipe on touch screens
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  return (
    <section id="guests" className="section">
      <div className="container stack-xl">
        <div className="section-head">
          <div className="stack section-head__text">
            <p className="eyebrow">{t.guests.eyebrow}</p>
            <h2 className="h2">{t.guests.title}</h2>
          </div>
          <div className="carousel-controls">
            <button type="button" className="round-btn round-btn--ghost" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t.guests.pause : t.guests.play}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {playing ? <path d="M7 5h3v14H7zM14 5h3v14h-3z" /> : <path d="M8 5l11 7-11 7z" />}
              </svg>
            </button>
            <button type="button" className="round-btn round-btn--ghost" onClick={prev} aria-label={t.guests.prev}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="round-btn round-btn--gold" onClick={next} aria-label={t.guests.next}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.guests.carouselLabel}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="carousel__track" style={{ transform: `translateX(${-100 * index}%)` }}>
            {guestPhotos.map((photo, i) => {
              const showImage = photo.src && !broken[i]
              return (
                <figure
                  key={i}
                  className="slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t.guests.slide(i + 1, count)}
                  aria-hidden={i !== index}
                  style={{ background: PLACEHOLDER_TONES[i % PLACEHOLDER_TONES.length] }}
                >
                  {showImage ? (
                    <img
                      src={photo.src}
                      alt={photo.caption[lang]}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                    />
                  ) : (
                    <div className="slide__placeholder">
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#E8B04A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span className="slide__ph-title">{t.guests.placeholder} {i + 1}</span>
                      <span className="slide__ph-hint">{t.guests.placeholderHint}</span>
                    </div>
                  )}
                  <figcaption className="slide__caption">{photo.caption[lang]}</figcaption>
                </figure>
              )
            })}
          </div>
        </div>

        <div className="dots">
          {guestPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot${i === index ? ' is-active' : ''}`}
              aria-label={t.guests.goTo(i + 1)}
              aria-current={i === index}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
