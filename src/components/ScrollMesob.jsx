import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// Scroll-driven scene: an open mesob rises into view, then injera, wot, eggs,
// misir, gomen and tibs land on it one after another as you scroll.
// variant="mobile" renders on phones (under the heading),
// variant="desktop" renders on wider screens, inline under the heading.

const HEADER_H = 76
// [start, end] of each layer within the scroll progress (0 → 1)
const STAGES = {
  mesob: [0.0, 0.14],
  injera: [0.14, 0.28],
  wot: [0.28, 0.41],
  eggs: [0.41, 0.54],
  misir: [0.54, 0.67],
  gomen: [0.67, 0.8],
  tibs: [0.8, 0.93],
}
const FOOD = ['injera', 'wot', 'eggs', 'misir', 'gomen', 'tibs']

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const local = (p, [a, b]) => clamp((p - a) / (b - a))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeBack = (t) => {
  const c1 = 1.4
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function useMedia(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

export default function ScrollMesob({ variant = 'mobile' }) {
  const { t } = useLanguage()
  const isActive = useMedia(variant === 'mobile' ? '(max-width: 760px)' : '(min-width: 761px)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [stage, setStage] = useState(0)

  const wrapRef = useRef(null)
  const stickyRef = useRef(null)
  const layers = {
    mesob: useRef(null),
    injera: useRef(null),
    wot: useRef(null),
    eggs: useRef(null),
    misir: useRef(null),
    gomen: useRef(null),
    tibs: useRef(null),
  }
  const hintRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    const drop = (el, k) => {
      const e = easeOut(k)
      el.setAttribute('transform', `translate(0 ${(-110 * (1 - e)).toFixed(1)})`)
      el.style.opacity = clamp(k * 3)
    }

    const apply = (p) => {
      const m = easeOut(local(p, STAGES.mesob))
      layers.mesob.current.setAttribute('transform', `translate(0 ${((1 - m) * 70).toFixed(1)})`)
      layers.mesob.current.style.opacity = m

      const ik = local(p, STAGES.injera)
      const s = 0.08 + 0.92 * easeBack(ik)
      layers.injera.current.setAttribute('transform', `translate(180 170) scale(${s.toFixed(3)}) translate(-180 -170)`)
      layers.injera.current.style.opacity = clamp(ik * 4)

      drop(layers.wot.current, local(p, STAGES.wot))
      drop(layers.eggs.current, local(p, STAGES.eggs))
      drop(layers.misir.current, local(p, STAGES.misir))
      drop(layers.gomen.current, local(p, STAGES.gomen))
      drop(layers.tibs.current, local(p, STAGES.tibs))

      if (hintRef.current) hintRef.current.style.opacity = 1 - clamp(p * 12)

      const done = FOOD.filter((f) => local(p, STAGES[f]) >= 0.7).length
      setStage((prev) => (prev === done ? prev : done))
    }

    if (reduced) {
      apply(1)
      return
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current
        const sticky = stickyRef.current
        if (!wrap || !sticky) return
        const rect = wrap.getBoundingClientRect()
        if (variant === 'desktop') {
          // Inline: builds while the scene travels from the bottom of the
          // screen (95%) up to the upper third (30%) — no pinning.
          const vh = window.innerHeight
          apply(clamp((vh * 0.95 - rect.top) / (vh * 0.65)))
        } else {
          // Phones: the scene is pinned while the tall wrapper scrolls past.
          const range = rect.height - sticky.offsetHeight
          apply(range > 0 ? clamp((HEADER_H - rect.top) / range) : 1)
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, reduced])

  if (!isActive) return null

  return (
    <div ref={wrapRef} className={`scene scene--${variant}${reduced ? ' scene--static' : ''}`}>
      <div ref={stickyRef} className="scene__sticky">
        <p className="scene__title">{t.story.scene.title}</p>

        <svg className="scene__svg" viewBox="10 80 340 310" role="img" aria-label={t.story.scene.alt}>
          <defs>
            <pattern id={`sm-weave-${variant}`} width="16" height="12" patternUnits="userSpaceOnUse">
              <path d="M0 12 L8 0 L16 12" fill="none" stroke="#C4452A" strokeWidth="2" />
            </pattern>
            <pattern id={`sm-holes-${variant}`} width="11" height="7" patternUnits="userSpaceOnUse">
              <ellipse cx="3" cy="2" rx="1.3" ry="0.8" fill="#B08757" />
              <ellipse cx="8.5" cy="5.5" rx="1" ry="0.6" fill="#B08757" />
            </pattern>
            <radialGradient id={`sm-wot-${variant}`} cx="45%" cy="35%" r="70%">
              <stop offset="0" stopColor="#C4452A" />
              <stop offset="1" stopColor="#7A2414" />
            </radialGradient>
          </defs>

          {/* soft floor shadow */}
          <ellipse cx="180" cy="378" rx="120" ry="12" fill="#1F1510" opacity="0.08" />

          {/* MESOB (open, lid off) */}
          <g ref={layers.mesob} style={{ opacity: 0 }}>
            <ellipse cx="180" cy="372" rx="72" ry="12" fill="#C4452A" />
            <path d="M110 370 L150 290 H210 L250 370 Z" fill="#D99A35" />
            <path d="M110 370 L150 290 H210 L250 370 Z" fill={`url(#sm-weave-${variant})`} opacity="0.45" />
            <path d="M126 338 H234" stroke="#2F7A4F" strokeWidth="6" />
            <rect x="144" y="280" width="72" height="14" rx="7" fill="#5A3A22" />
            <path d="M150 286 L58 200 H302 L210 286 Z" fill="#E2A743" />
            <path d="M150 286 L58 200 H302 L210 286 Z" fill={`url(#sm-weave-${variant})`} opacity="0.5" />
            <path d="M101 240 H259" stroke="#2F7A4F" strokeWidth="6" />
            <path d="M125 262 H235" stroke="#17100C" strokeWidth="3" opacity="0.7" />
            {/* tray */}
            <ellipse cx="180" cy="180" rx="158" ry="54" fill="#A8341C" />
            <ellipse cx="180" cy="171" rx="154" ry="49" fill="#3A2A20" />
            <ellipse cx="180" cy="171" rx="124" ry="38" fill="none" stroke="#5A4332" strokeWidth="2" />
            <ellipse cx="180" cy="171" rx="90" ry="26" fill="none" stroke="#5A4332" strokeWidth="2" />
          </g>

          {/* INJERA */}
          <g ref={layers.injera} style={{ opacity: 0 }}>
            <ellipse cx="180" cy="172" rx="144" ry="46" fill="#C9A673" />
            <ellipse cx="180" cy="169" rx="142" ry="44" fill="#DDBF8F" />
            <ellipse cx="180" cy="169" rx="142" ry="44" fill={`url(#sm-holes-${variant})`} opacity="0.8" />
            {/* rolled injera on the side */}
            <rect x="46" y="150" width="64" height="17" rx="8.5" fill="#D2B080" stroke="#B08757" strokeWidth="1.5" />
            <rect x="54" y="166" width="64" height="17" rx="8.5" fill="#D2B080" stroke="#B08757" strokeWidth="1.5" />
            <rect x="46" y="182" width="64" height="17" rx="8.5" fill="#D2B080" stroke="#B08757" strokeWidth="1.5" />
          </g>

          {/* WOT */}
          <g ref={layers.wot} style={{ opacity: 0 }}>
            <ellipse cx="176" cy="172" rx="68" ry="24" fill="#6B1F12" />
            <ellipse cx="174" cy="166" rx="62" ry="20" fill={`url(#sm-wot-${variant})`} />
            <ellipse cx="152" cy="159" rx="18" ry="5" fill="#E8744A" opacity="0.55" />
            <ellipse cx="196" cy="170" rx="12" ry="3.5" fill="#E8744A" opacity="0.45" />
            <circle cx="138" cy="170" r="2.4" fill="#F3EADF" opacity="0.5" />
            <circle cx="208" cy="160" r="2" fill="#F3EADF" opacity="0.5" />
          </g>

          {/* EGGS (halved) */}
          <g ref={layers.eggs} style={{ opacity: 0 }}>
            <ellipse cx="156" cy="158" rx="19" ry="13" fill="#FBF6EC" stroke="#E2D5C2" strokeWidth="1.4" />
            <ellipse cx="156" cy="157" rx="8.5" ry="6" fill="#F2B632" />
            <ellipse cx="198" cy="155" rx="19" ry="13" fill="#FBF6EC" stroke="#E2D5C2" strokeWidth="1.4" />
            <ellipse cx="198" cy="154" rx="8.5" ry="6" fill="#F2B632" />
          </g>

          {/* TIBS: sautéed beef cubes with onion, green pepper and rosemary */}
          <g ref={layers.tibs} style={{ opacity: 0 }}>
            <ellipse cx="266" cy="168" rx="44" ry="16" fill="#4A2512" opacity="0.35" />
            <rect x="233" y="140" width="15" height="12" rx="3.5" fill="#6B3A1E" transform="rotate(-8 240 146)" />
            <rect x="236" y="142" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-8 240 146)" />
            <rect x="249" y="135" width="15" height="12" rx="3.5" fill="#7E4522" transform="rotate(6 256 141)" />
            <rect x="252" y="137" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(6 256 141)" />
            <rect x="265" y="138" width="15" height="12" rx="3.5" fill="#5A2F17" transform="rotate(-4 272 144)" />
            <rect x="268" y="140" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-4 272 144)" />
            <rect x="281" y="143" width="15" height="12" rx="3.5" fill="#7E4522" transform="rotate(10 288 149)" />
            <rect x="284" y="145" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(10 288 149)" />
            <rect x="227" y="154" width="15" height="12" rx="3.5" fill="#7E4522" transform="rotate(4 234 160)" />
            <rect x="230" y="156" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(4 234 160)" />
            <rect x="243" y="150" width="15" height="12" rx="3.5" fill="#5A2F17" transform="rotate(-10 250 156)" />
            <rect x="246" y="152" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-10 250 156)" />
            <rect x="259" y="152" width="15" height="12" rx="3.5" fill="#6B3A1E" transform="rotate(7 266 158)" />
            <rect x="262" y="154" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(7 266 158)" />
            <rect x="275" y="155" width="15" height="12" rx="3.5" fill="#8A4E26" transform="rotate(-6 282 161)" />
            <rect x="278" y="157" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-6 282 161)" />
            <rect x="291" y="157" width="15" height="12" rx="3.5" fill="#6B3A1E" transform="rotate(3 298 163)" />
            <rect x="294" y="159" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(3 298 163)" />
            <rect x="237" y="166" width="15" height="12" rx="3.5" fill="#6B3A1E" transform="rotate(-5 244 172)" />
            <rect x="240" y="168" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-5 244 172)" />
            <rect x="253" y="165" width="15" height="12" rx="3.5" fill="#8A4E26" transform="rotate(9 260 171)" />
            <rect x="256" y="167" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(9 260 171)" />
            <rect x="269" y="168" width="15" height="12" rx="3.5" fill="#5A2F17" transform="rotate(-3 276 174)" />
            <rect x="272" y="170" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(-3 276 174)" />
            <rect x="285" y="170" width="15" height="12" rx="3.5" fill="#7E4522" transform="rotate(6 292 176)" />
            <rect x="288" y="172" width="7" height="2.5" rx="1.2" fill="#A8622F" opacity="0.7" transform="rotate(6 292 176)" />
            {/* onion slivers */}
            <path d="M238 152 q8 -7 16 0" fill="none" stroke="#F3E3C3" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M268 166 q7 -6 14 1" fill="none" stroke="#F3E3C3" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M286 152 q6 5 13 1" fill="none" stroke="#EAD3AE" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M250 178 q6 -5 12 0" fill="none" stroke="#F3E3C3" strokeWidth="2.4" strokeLinecap="round" />
            {/* green pepper strips */}
            <path d="M258 148 l12 4" stroke="#3E8E4F" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M240 168 l10 -3" stroke="#3E8E4F" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M284 170 l11 3" stroke="#4FA05F" strokeWidth="3.2" strokeLinecap="round" />
            {/* rosemary sprig */}
            <path d="M262 134 L292 128" stroke="#2F5E3A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M267 133 l-2 -4 M267 133 l1 4 M273 132 l-2 -4 M273 132 l1 4 M279 131 l-2 -4 M279 131 l1 4 M285 130 l-2 -4 M285 130 l1 4" stroke="#3E7A4A" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          {/* MISIR: red lentil stew */}
          <g ref={layers.misir} style={{ opacity: 0 }}>
            <ellipse cx="148" cy="200" rx="33" ry="11" fill="#9A3714" />
            <ellipse cx="147" cy="196.5" rx="29" ry="8.5" fill="#D35A26" />
            <ellipse cx="140" cy="194.5" rx="11" ry="2.8" fill="#EE8A52" opacity="0.6" />
            <circle cx="158" cy="197" r="1.4" fill="#F6C9A4" opacity="0.7" />
            <circle cx="133" cy="198" r="1.1" fill="#F6C9A4" opacity="0.7" />
          </g>

          {/* GOMEN: braised collard greens */}
          <g ref={layers.gomen} style={{ opacity: 0 }}>
            <ellipse cx="226" cy="200" rx="33" ry="11" fill="#244A24" />
            <ellipse cx="222.3" cy="196.1" rx="5.1" ry="1.9" fill="#356E35" transform="rotate(-28 222.3 196.1)" />
            <ellipse cx="222.9" cy="194.6" rx="4.8" ry="1.8" fill="#5A9A4C" transform="rotate(13 222.9 194.6)" />
            <ellipse cx="231.6" cy="194.5" rx="4.6" ry="2.8" fill="#3F7A3A" transform="rotate(-12 231.6 194.5)" />
            <ellipse cx="213.2" cy="191.2" rx="3.7" ry="2.5" fill="#3F7A3A" transform="rotate(-12 213.2 191.2)" />
            <ellipse cx="248.7" cy="197.7" rx="4.2" ry="2.0" fill="#3F7A3A" transform="rotate(33 248.7 197.7)" />
            <ellipse cx="217.7" cy="201.9" rx="4.0" ry="2.5" fill="#4E8F45" transform="rotate(7 217.7 201.9)" />
            <ellipse cx="243.4" cy="199.0" rx="4.9" ry="2.5" fill="#5A9A4C" transform="rotate(28 243.4 199.0)" />
            <ellipse cx="214.3" cy="196.1" rx="5.0" ry="2.3" fill="#2F6630" transform="rotate(-9 214.3 196.1)" />
            <ellipse cx="231.8" cy="189.6" rx="4.1" ry="2.5" fill="#356E35" transform="rotate(23 231.8 189.6)" />
            <ellipse cx="241.2" cy="191.1" rx="4.2" ry="3.0" fill="#3F7A3A" transform="rotate(25 241.2 191.1)" />
            <ellipse cx="206.8" cy="198.7" rx="3.9" ry="2.4" fill="#3F7A3A" transform="rotate(-31 206.8 198.7)" />
            <ellipse cx="227.7" cy="189.8" rx="5.7" ry="2.2" fill="#2F6630" transform="rotate(36 227.7 189.8)" />
            <ellipse cx="203.3" cy="195.8" rx="3.7" ry="1.9" fill="#2F6630" transform="rotate(20 203.3 195.8)" />
            <ellipse cx="224.4" cy="192.2" rx="5.3" ry="2.2" fill="#356E35" transform="rotate(17 224.4 192.2)" />
            <ellipse cx="222.8" cy="198.8" rx="5.2" ry="1.8" fill="#5A9A4C" transform="rotate(5 222.8 198.8)" />
            <ellipse cx="229.5" cy="195.6" rx="3.6" ry="2.7" fill="#4E8F45" transform="rotate(-9 229.5 195.6)" />
            <ellipse cx="206.2" cy="200.1" rx="4.7" ry="2.0" fill="#5A9A4C" transform="rotate(30 206.2 200.1)" />
            <ellipse cx="224.6" cy="196.2" rx="4.6" ry="2.5" fill="#5A9A4C" transform="rotate(5 224.6 196.2)" />
            <ellipse cx="220.0" cy="190.8" rx="4.1" ry="1.9" fill="#4E8F45" transform="rotate(-11 220.0 190.8)" />
            <ellipse cx="225.0" cy="192.8" rx="5.6" ry="2.0" fill="#2F6630" transform="rotate(-40 225.0 192.8)" />
            <ellipse cx="236.9" cy="199.1" rx="5.0" ry="2.2" fill="#4E8F45" transform="rotate(25 236.9 199.1)" />
            <ellipse cx="245.2" cy="193.5" rx="5.3" ry="2.3" fill="#356E35" transform="rotate(10 245.2 193.5)" />
            <ellipse cx="214.1" cy="197.3" rx="4.7" ry="2.3" fill="#4E8F45" transform="rotate(-32 214.1 197.3)" />
            <ellipse cx="241.8" cy="194.4" rx="3.8" ry="2.5" fill="#3F7A3A" transform="rotate(-40 241.8 194.4)" />
            <ellipse cx="209.7" cy="193.0" rx="5.9" ry="2.5" fill="#3F7A3A" transform="rotate(-14 209.7 193.0)" />
            <ellipse cx="219.8" cy="192.4" rx="4.1" ry="2.2" fill="#2F6630" transform="rotate(20 219.8 192.4)" />
            <circle cx="210.9" cy="197.8" r="1.3" fill="#C9E2A8" />
            <circle cx="245.7" cy="194.7" r="1.3" fill="#C9E2A8" />
            <circle cx="225.4" cy="191.7" r="1.3" fill="#C9E2A8" />
            <circle cx="210.1" cy="193.7" r="1.3" fill="#C9E2A8" />
            <circle cx="216.6" cy="197.6" r="1.3" fill="#C9E2A8" />
            <circle cx="212.5" cy="191.2" r="1.3" fill="#C9E2A8" />
          </g>

        </svg>

        <ol className="scene__steps" aria-hidden="true">
          {t.story.scene.items.map((label, i) => (
            <li key={label} className={i < stage ? 'is-on' : ''}>{label}</li>
          ))}
        </ol>

        {!reduced && variant === 'mobile' && (
          <p ref={hintRef} className="scene__hint" aria-hidden="true">
            {t.story.scene.hint}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </p>
        )}
      </div>
    </div>
  )
}
